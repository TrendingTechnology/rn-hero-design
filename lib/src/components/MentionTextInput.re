module RN = ReactNative;

[@bs.val] external setTimeout: (unit => unit, int) => unit = "setTimeout";

[@bs.deriving abstract]
type mention = {
  mid: string,
  name: string,
  offset: (int, int),
};

type mentions = array(mention);

[@bs.deriving abstract]
type textBlock = {
  id: option(string),
  text: string,
};

type message = array(textBlock);

let rec deserialize = (~startIndex=0, text, mentions) =>
  if (mentions->Array.length->(<=)(0)) {
    [|
      textBlock(
        ~text=Js.String.substringToEnd(~from=startIndex, text),
        ~id=None,
      ),
    |];
  } else {
    let head = Belt.Array.slice(mentions, ~offset=0, ~len=1);
    let tail = Belt.Array.sliceToEnd(mentions, 1);
    let mention = head[0];
    Array.append(
      [|
        textBlock(
          ~text=
            Js.String.substring(
              ~from=startIndex,
              ~to_=mention->offsetGet->fst,
              text,
            ),
          ~id=None,
        ),
        textBlock(
          ~text=
            Js.String.substring(
              ~from=mention->offsetGet->fst,
              ~to_=mention->offsetGet->snd->(-)(1),
              text,
            ),
          ~id=Some(mention->midGet),
        ),
      |],
      deserialize(~startIndex=mention->offsetGet->snd->(-)(1), text, tail),
    );
  };

/*
 * Extract all mentioned users in message, in order
 */
let getMentionsFromMessage: message => mentions =
  message => {
    let startOffset = ref(0);

    message->Belt.Array.reduce(
      [||],
      (mentions, textBlock) => {
        let id = textBlock->idGet;
        let text = textBlock->textGet;
        let textLength = text->String.length;
        let endOffset = startOffset^ + textLength;
        let result =
          switch (id) {
          | Some(id) =>
            Belt.Array.concat(
              mentions,
              [|
                mention(
                  ~mid=id,
                  ~name=text,
                  ~offset=(startOffset^, endOffset + 1) /* include the space after */
                ),
              |],
            )
          | None => mentions
          };

        startOffset := endOffset;

        result;
      },
    );
  };

type affectedMentionIndexes = {
  selected: array(int),
  unselected: array(int),
};

/*
 * Get the indexes of mentions, of which offsets may change when the selection changes
 */
let getAffectedMentionIndexes = (~selection, mentions) =>
  mentions->Belt.Array.reduceWithIndex(
    ([||], [||]),
    (affectedIndexes, mention, index) => {
      let offset = mention->offsetGet;
      let isSelected =
        fst(offset) < snd(selection) && snd(offset) > fst(selection);
      let isUnselected = fst(offset) >= snd(selection);
      let (selectedIndexes, unselectedIndexes) = affectedIndexes;

      if (isSelected) {
        (Array.append(selectedIndexes, [|index|]), unselectedIndexes);
      } else if (isUnselected) {
        (selectedIndexes, Array.append(unselectedIndexes, [|index|]));
      } else {
        affectedIndexes;
      };
    },
  );

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
  /* let searchPosition = React.useRef(0); */
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
      /*only calculate when value change*/

      open Js.Array;
      setCurrent(valueText, value |> map(textGet) |> joinWith(""));
      setCurrent(mentions, value |> getMentionsFromMessage);
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
               ~mid=unselectedMention->midGet,
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

      onChange(deserialize(text, restMentions));

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
      /*                 ~mid=unselectedMention->midGet, */
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

  let handleSuggestionPress = (mid, name) => {
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
    /*     ~add=[|mention(~mid, ~name="@" ++ name, ~offset=((-1), (-1)))|], */
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
             switch (textBlock->idGet) {
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
