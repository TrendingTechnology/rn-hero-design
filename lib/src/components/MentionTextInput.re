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

/* TODO: review later */
/*rename to serialize*/
let rec parseMessage: (string, mentions) => message =
  (message, mentions) => {
    let indexOfFirstMention = String.index_opt(message, '@');
    let mentionsLength = Array.length(mentions);
    let hasAnyMention =
      Belt.Option.isSome(indexOfFirstMention) && mentionsLength > 0;

    if (hasAnyMention) {
      let indexOfFirstMention = Belt.Option.getExn(indexOfFirstMention);
      let headMessage =
        Js.String.substring(~from=0, ~to_=indexOfFirstMention, message);
      let tailMessage =
        Js.String.substringToEnd(~from=indexOfFirstMention, message);
      let indexOfMatchedMention =
        mentions->Belt.Array.getIndexBy(mention =>
          mention->nameGet->Js.String.startsWith(tailMessage)
        );

      switch (indexOfMatchedMention) {
      | Some(index) =>
        let matchedMention = mentions[index];
        let restMessage =
          Js.String.substringToEnd(
            ~from=matchedMention->nameGet->String.length,
            tailMessage,
          );
        let restMentions = Js.Array.filteri((_, i) => i !== index, mentions);

        Array.concat([
          [|textBlock(~text=headMessage, ~id=None)|],
          [|
            textBlock(
              ~text=nameGet(matchedMention),
              ~id=Some(midGet(matchedMention)),
            ),
          |],
          parseMessage(restMessage, restMentions),
        ]);
      | None =>
        Array.concat([
          [|textBlock(~text=headMessage ++ "@", ~id=None)|],
          parseMessage(
            tailMessage->Js.String.substringToEnd(~from=1),
            mentions,
          ),
        ])
      };
    } else {
      [|textBlock(~text=message, ~id=None)|];
    };
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
/* let getAffectedMentionIndexes = (selection, mentions) => { */
/*   let init: affectedMentionIndexes = {selected: [||], unselected: [||]}; */

/*   mentions->Belt.Array.reduceWithIndex( */
/*     init, */
/*     (indexes, mention, index) => { */
/*       let offset = mention->offsetGet; */
/*       let {selected, unselected} = indexes; */
/*       let isUnselected = fst(offset) >= snd(selection); */
/*       let isSelected = */
/*         fst(offset) < snd(selection) && snd(offset) > fst(selection); */

/*       if (isSelected) { */
/*         {...indexes, selected: Array.append(selected, [|index|])}; */
/*       } else if (isUnselected) { */
/*         {...indexes, unselected: Array.append(unselected, [|index|])}; */
/*       } else { */
/*         indexes; */
/*       }; */
/*     }, */
/*   ); */
/* }; */

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
      ~suggestionData,
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

  let onChange = () => {
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
      Js.log(key);
      Js.log(text);
      Js.log(previousSelection_);
      let mentions = getMentionsFromMessage(value);
      let (selectedMentionIndexes, unselectedMentionIndexes) =
        getAffectedMentionIndexes(~selection=previousSelection_, mentions);
      Js.log("=======");
      Js.log(selectedMentionIndexes);
      Js.log(unselectedMentionIndexes);

      setRenderCount(renderCount => renderCount + 1);
      setCurrent(previousSelection, selection);
      ();

    | _ => ()
    };
  };

  let handleSelectionChange =
    React.useCallback(event => {
      /* Js.log("SELECTION CHANGE"); */
      let selection = event##nativeEvent##selection;
      eventSelection := Some((selection##start, selection##_end));
      onChange();
      /* setCurrent(previousSelection, (selection##start, selection##_end)); */
      /* let selectionRange = (selection##start, selection##_end); */
      /* setCurrent(latestPosition, selection##start); */
      /* setTimeout( */
      /*   () => { */
      /*     Js.log("SELECT CHANGE"); */
      /*     Js.log(selectionRange); */
      /*     Js.log(current(mentions)); */
      /*     Js.log( */
      /*       getAffectedMentionIndexes(selectionRange, current(mentions)), */
      /*     ); */
      /*     setCurrent( */
      /*       affectedMentions, */
      /*       getAffectedMentionIndexes(selectionRange, current(mentions)), */
      /*     ); */
      /*   }, */
      /*   10, */
      /* ); [> when users press a key, selection change will be triggered first and we don't want that <] */
      ();
    });

  let handleKeyPress =
    React.useCallback(event => {
      eventKey := Some(event##nativeEvent##key);
      onChange();
    });

  let handleChangeText =
    React.useCallback(text => {
      /* Js.log("CHANGE TEXT"); */

      eventText := Some(text);
      onChange();

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
