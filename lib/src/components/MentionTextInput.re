module RN = ReactNative;

let castArray: 't => array('t) = value => [|value|];

let arrayInsertAt = (~pos, ~value, array_) =>
  Js.Array.(
    value
    ->castArray
    ->concat(slice(~start=0, ~end_=pos, array_))
    ->concat(slice(~start=pos, ~end_=length(array_), array_), _)
  );

let stringInsertAt = (~pos, ~value, string_) =>
  Js.String.(
    value
    ->concat(substring(~from=0, ~to_=pos, string_))
    ->concat(substringToEnd(~from=pos, string_), _)
  );

[@bs.deriving abstract]
type textBlock = {
  ref: option(string),
  text: string,
};

type message = array(textBlock);

[@bs.deriving abstract]
type mention = {
  id: string,
  name: string,
  offset: (int, int),
};

type mentions = array(mention);

let deserialize: message => (string, mentions) =
  message => {
    open Js.Array;

    let text = message |> map(textGet) |> joinWith("");
    let startOffset = ref(0);
    let mentions =
      message
      |> reduce(
           (mentions, textBlock) => {
             let ref = textBlock->refGet;
             let text = textBlock->textGet;
             let textLength = text->String.length;
             let endOffset = startOffset^ + textLength;
             let result =
               switch (ref) {
               | None => mentions
               | Some(ref) =>
                 mention(
                   ~id=ref,
                   ~name=text,
                   ~offset=(startOffset^, endOffset + 1) /* include the char after */
                 )
                 ->castArray
                 ->concat(mentions)
               };

             startOffset := endOffset;

             result;
           },
           [||],
         );

    (text, mentions);
  };

let serialize: (string, mentions) => message =
  (text, mentions) => {
    open Js.String;

    let startIndex = ref(0);

    mentions
    |> Js.Array.reduce(
         (message, mention) => {
           let id = mention->idGet;
           let (startOffset, endOffset) = mention->offsetGet;
           let result =
             [|
               textBlock(
                 ~ref=None,
                 ~text=text |> substring(~from=startIndex^, ~to_=startOffset),
               ),
               textBlock(
                 ~ref=Some(id),
                 ~text=
                   text |> substring(~from=startOffset, ~to_=endOffset - 1),
               ),
             |]
             ->Js.Array.concat(message);

           startIndex := endOffset - 1;

           result;
         },
         [||],
       )
    |> Js.Array.concat(
         castArray(
           textBlock(
             ~ref=None,
             ~text=text |> substringToEnd(~from=startIndex^),
           ),
         ),
       );
  };

type selection = (int, int);

type affectedMentionIndexes = (array(int), array(int));

let getAffectedMentionIndexes:
  (~selection: selection, mentions) => affectedMentionIndexes =
  (~selection, mentions) => {
    Js.Array.(
      mentions
      |> reducei(
           (affectedIndexes, mention, index) => {
             let offset = mention->offsetGet;
             let (startOffset, endOffset) = offset;
             let (startSel, endSel) = selection;
             let (selectedIndexes, unselectedIndexes) = affectedIndexes;

             let isSelected = startOffset < endSel && endOffset > startSel;
             let isUnselected = startOffset >= endSel;

             if (isSelected) {
               (
                 index->castArray->concat(selectedIndexes),
                 unselectedIndexes,
               );
             } else if (isUnselected) {
               (
                 selectedIndexes,
                 index->castArray->concat(unselectedIndexes),
               );
             } else {
               affectedIndexes;
             };
           },
           ([||], [||]),
         )
    );
  };

let _ACTIVATOR = "@";
let _SPACES = [|"undefined", " ", "\n"|];

[@react.component]
let make =
    (
      ~value: message,
      ~onChange,
      ~renderSuggestionList,
      ~theme=Hero_Theme.default,
    ) => {
  open React.Ref;

  let valueText = React.useRef("");
  let mentions = React.useRef([||]);

  /* let latestKey = React.useRef(""); */
  /* let latestPosition = React.useRef(0); */
  let searchPosition = React.useRef(0);
  /* let affectedMentions = React.useRef({selected: [||], unselected: [||]}); */

  let (showSuggestions, setShowSuggestions) = React.useState(() => false);
  let (searchValue, setSearchValue) = React.useState(() => "");

  let eventText = ref(None);
  let eventKey = ref(None);
  let eventSelection = ref(None);
  let previousSelection = React.useRef((0, 0));

  /* HACK!!!, consider using value if performance is ok */
  let (_renderCount, setRenderCount) = React.useState(() => 0);

  React.useEffect1(
    () => {
      let (valueText_, mentions_) = deserialize(value);
      setCurrent(valueText, valueText_);
      setCurrent(mentions, mentions_);
      None;
    },
    [|value|],
  );

  let handleChange = () => {
    let eventKey = eventKey^;
    let eventText = eventText^;
    let eventSelection = eventSelection^;

    switch (eventKey, eventText, eventSelection) {
    | (None, None, Some(selection)) =>
      Js.log("ONLY SELECTION CHANGE LOL!!!");
      setCurrent(previousSelection, selection);
    /* setRenderCount(renderCount => renderCount + 1); */

    | (Some(key), Some(text), Some(selection)) =>
      let previousSelection_ = current(previousSelection);
      let mentions_ = current(mentions);
      let valueText_ = current(valueText);
      let (selectedMentionIndexes, unselectedMentionIndexes) =
        getAffectedMentionIndexes(~selection=previousSelection_, mentions_);

      let lenDiff = Js.String.(length(text) - length(valueText_));

      /* update offset */
      /* modify mentions_ */
      unselectedMentionIndexes
      |> Js.Array.forEach(index => {
           let unselectedMention = mentions_[index];
           mentions_->Array.set(
             index,
             mention(
               ~id=unselectedMention->idGet,
               ~name=unselectedMention->nameGet,
               ~offset=(
                 unselectedMention->offsetGet->fst->(+)(lenDiff),
                 unselectedMention->offsetGet->snd->(+)(lenDiff),
               ),
             ),
           );
         });

      /* remove selected mentions */
      let restMentions =
        if (Array.length(selectedMentionIndexes) > 0) {
          mentions_
          |> Js.Array.filteri((_, index) =>
               selectedMentionIndexes |> Js.Array.includes(index) |> (!)
             );
        } else {
          mentions_;
        };

      /*show suggestions*/
      if (!showSuggestions) {
        let position = selection->fst;
        let previousChar = Js.String.get(text, position - 2);
        let canShowSuggestion =
          position < 2 || previousChar === " " || previousChar === "\n";

        if (key === _ACTIVATOR && canShowSuggestion) {
          setShowSuggestions(_ => true);
          setCurrent(searchPosition, position);
        };
      } else {
        let searchPosition_ = current(searchPosition);
        let searchValue =
          Js.String.substring(
            ~from=searchPosition_,
            ~to_=selection->fst,
            text,
          );
        setSearchValue(_ => searchValue);
      };

      onChange(serialize(text, restMentions));

      /* setRenderCount(renderCount => renderCount + 1); */

      setCurrent(previousSelection, selection);
      ();

    | _ => ()
    };
  };

  let handleSelectionChange =
    React.useCallback(event => {
      let selection = event##nativeEvent##selection;
      eventSelection := Some((selection##start, selection##_end));
      handleChange();
    });

  let handleKeyPress =
    React.useCallback(event => {
      eventKey := Some(event##nativeEvent##key);
      handleChange();
    });

  let handleChangeText =
    React.useCallback(text => {
      eventText := Some(text);
      handleChange();

      /* valueText := text; */
      /* setTimeout( */
      /*   () => { */
      /*     let mentions_ = current(mentions); */
      /*     let affectedMentions_ = current(affectedMentions); */
      /*     setCurrent(valueText, text); */
      /*     [> remove mentions <] */
      /*     if (Array.length(affectedMentions_.selected) > 0) { */
      /*       let restMentions = */
      /*         mentions_ */
      /*         |> Js.Array.filteri((_, index) => */
      /*              affectedMentions_.selected */
      /*              |> Js.Array.includes(index) */
      /*              |> (!) */
      /*            ); */
      /*       let parsedMessage = parseMessage(text, restMentions); */
      /*       onChange(parsedMessage); */
      /*     }; */
      /*     [> update mention offset <] */
      /*     Js.log("TEXT CHANGE"); */
      /*     Js.log(mentions_); */
      /*     Js.log(affectedMentions_); */
      /*     let valueText_ = current(valueText); */
      /*     let lenDiff = String.(length(text) - length(valueText_)); */
      /*     let updatedMentions = */
      /*       affectedMentions_.unselected */
      /*       ->Belt.Array.reduce( */
      /*           mentions_, */
      /*           (mentions, index) => { */
      /*             let unselectedMention = mentions[index]; */
      /*             Belt.Array.setUnsafe( */
      /*               mentions, */
      /*               index, */
      /*               mention( */
      /*                 ~id=unselectedMention->idGet, */
      /*                 ~name=unselectedMention->nameGet, */
      /*                 ~offset=( */
      /*                   unselectedMention->offsetGet->fst->(+)(lenDiff), */
      /*                   unselectedMention->offsetGet->snd->(+)(lenDiff), */
      /*                 ), */
      /*               ), */
      /*             ); */
      /*             mentions; */
      /*           }, */
      /*         ); */
      /*     setCurrent(mentions, updatedMentions); */
      /*   }, */
      /* show suggestions */
      /* let latestKey_ = current(latestKey); */
      /* let latestPosition_ = current(latestPosition); */
      /* let searchPosition_ = current(searchPosition); */
      /* let previousChar = Js.String.(text->get(latestPosition_ - 2)->make); */
      /* if (!showSuggestions) { */
      /*   if (latestKey_ === _ACTIVATOR */
      /*       && previousChar->Js.Array.includes(_SPACES)) { */
      /*     setShowSuggestions(_ => true); */
      /*     setCurrent(searchPosition, latestPosition_); */
      /*   }; */
      /* } else { */
      /*   let searchValue = */
      /*     Js.String.substring( */
      /*       ~from=searchPosition_, */
      /*       ~to_=latestPosition_, */
      /*       text, */
      /*     ); */
      /*   setSearchValue(_ => searchValue); */
      /* }; */
      /* 4, */
      /* ) */
      ();
    });

  let handleSuggestionPress = (id, name) => {
    /* let valueText_ = current(valueText); */
    /* let mentions_ = current(mentions); */
    /* let affectedMentions_ = current(affectedMentions); */
    /* let insertPos = */
    /*   affectedMentions_.unselected */
    /*   ->Belt.Array.get(0) */
    /*   ->Belt.Option.getWithDefault(Array.length(mentions_)); */
    /* let updatedValueText = */
    /*   Js.String.substring(~from=0, ~to_=current(searchPosition), valueText_) */
    /*   ++ name */
    /*   ++ " " */
    /*   ++ Js.String.substringToEnd(~from=current(searchPosition), valueText_); */
    /* let _ = */
    /*   Js.Array.spliceInPlace( */
    /*     ~pos=insertPos, */
    /*     ~remove=0, */
    /*     ~add=[|mention(~id, ~name="@" ++ name, ~offset=((-1), (-1)))|], */
    /*     mentions_, */
    /*   ); */
    /* let parsedMessage: message = parseMessage(updatedValueText, mentions_); */
    /* setShowSuggestions(_ => false); */
    /* onChange(parsedMessage); */
  };

  <RN.View style=theme##mentionTextInput##wrapper>
    <TextInput
      onChangeText=handleChangeText
      onKeyPress=handleKeyPress
      multiline=true
      onSelectionChange=handleSelectionChange>
      <RN.Text style={theme##mentionTextInput##text}>
        {value
         ->Belt.Array.mapWithIndex((index, textBlock) => {
             switch (textBlock->refGet) {
             | Some(_) =>
               <RN.Text
                 key={string_of_int(index)}
                 style={theme##mentionTextInput##highlightText}>
                 {textBlock->textGet->React.string}
               </RN.Text>
             | None =>
               <RN.Text key={string_of_int(index)}>
                 {textBlock->textGet->React.string}
               </RN.Text>
             }
           })
         ->React.array}
      </RN.Text>
    </TextInput>
    {showSuggestions
       ? <RN.View style=theme##mentionTextInput##suggestionWrapper>
           {renderSuggestionList(searchValue, handleSuggestionPress)}
         </RN.View>
       : React.null}
  </RN.View>;
};

let default = make;
