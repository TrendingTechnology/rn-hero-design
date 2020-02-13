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
  mutable offset: (int, int),
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

let _TRIGGER = "@";

[@react.component]
let make =
    (
      ~testID,
      ~placeholder,
      ~value: message,
      ~onChange: message => unit,
      ~renderSuggestionList,
      ~theme=Hero_Theme.default,
    ) => {
  open React.Ref;

  let valueText = React.useRef("");
  let mentions = React.useRef([||]);
  let searchStartPosition = React.useRef(0);
  let previousSelection = React.useRef((0, 0));

  let (showSuggestions, setShowSuggestions) = React.useState(() => false);
  let (searchValue, setSearchValue) = React.useState(() => "");

  let eventKey = ref(None);
  let eventText = ref(None);
  let eventSelection = ref(None);

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
      setShowSuggestions(_ => false);
      setCurrent(previousSelection, selection);

    | (Some(key), Some(text), Some(selection)) =>
      let valueText_ = current(valueText);
      let mentions_ = current(mentions);
      let previousSelection_ = current(previousSelection);

      let currentPosition = fst(selection);
      let textDiff = Js.String.(length(text) - length(valueText_));
      let (selectedIndexes, unselectedIndexes) =
        getAffectedMentionIndexes(~selection=previousSelection_, mentions_);

      /* shift offsets, mutate mentions */
      Js.Array.(
        unselectedIndexes
        |> forEach(index => {
             let unselectedMention = mentions_[index];
             let (startOffset, endOffset) = unselectedMention->offsetGet;

             unselectedMention->offsetSet((
               startOffset + textDiff,
               endOffset + textDiff,
             ));
           })
      );

      /* remove selected, mutate mentions */
      Js.Array.(
        selectedIndexes
        |> reverseInPlace
        |> forEach(index => {
             let _ =
               mentions_ |> spliceInPlace(~pos=index, ~remove=1, ~add=[||]);
             ();
           })
      );

      if (!showSuggestions) {
        if (key === _TRIGGER) {
          setSearchValue(_ => "");
          setShowSuggestions(_ => true);
          setCurrent(searchStartPosition, currentPosition);
        };
      };

      if (showSuggestions) {
        let searchStartPosition_ = current(searchStartPosition);
        let searchValue =
          Js.String.substring(
            ~from=searchStartPosition_,
            ~to_=currentPosition,
            text,
          );

        if (key === " " || key === "Enter" || searchValue === "") {
          setShowSuggestions(_ => false);
        } else {
          setSearchValue(_ => searchValue);
        };
      };

      onChange(serialize(text, mentions_));
      setCurrent(previousSelection, selection);

    | _ => ()
    };
  };

  let handleSuggestionPress = (id, name) => {
    let valueText_ = current(valueText);
    let mentions_ = current(mentions);
    let searchStartPosition_ = current(searchStartPosition);
    let previousSelection_ = current(previousSelection);

    let insertText = name ++ " ";
    let textDiff = Js.String.length(insertText);
    let (_, unselectedIndexes) =
      getAffectedMentionIndexes(~selection=previousSelection_, mentions_);
    let insertPos =
      unselectedIndexes
      ->Belt.Array.get(0)
      ->Belt.Option.getWithDefault(Js.Array.length(mentions_));
    let newMention =
      mention(
        ~id,
        ~name=_TRIGGER ++ name,
        ~offset=(searchStartPosition_ - 1, searchStartPosition_ + textDiff) /* offset includes the @ and the space after */
      );

    /* shift offsets, mutate mentions */
    Js.Array.(
      unselectedIndexes
      |> forEach(index => {
           let unselectedMention = mentions_[index];
           let (startOffset, endOffset) = unselectedMention->offsetGet;

           unselectedMention->offsetSet((
             startOffset + textDiff,
             endOffset + textDiff,
           ));
         })
    );

    let valueText_ =
      stringInsertAt(
        ~pos=searchStartPosition_,
        ~value=insertText,
        valueText_,
      );

    let mentions_ =
      arrayInsertAt(~pos=insertPos, ~value=newMention, mentions_);

    onChange(serialize(valueText_, mentions_));
    setShowSuggestions(_ => false);
  };

  let handleSelectionChange =
    React.useCallback(event => {
      let selection = event##nativeEvent##selection;
      eventSelection := Some((selection##start, selection##_end));
      handleChange();
    });

  let handleKeyPress =
    React.useCallback(event => {
      let key = event##nativeEvent##key;
      eventKey := Some(key);
      handleChange();
    });

  let handleChangeText =
    React.useCallback(text => {
      eventText := Some(text);
      handleChange();
    });

  <RN.View style=theme##mentionTextInput##wrapper>
    <TextInput
      testID
      placeholder
      multiline=true
      onKeyPress=handleKeyPress
      onChangeText=handleChangeText
      onSelectionChange=handleSelectionChange>
      <RN.Text style={theme##mentionTextInput##text}>
        {value
         |> Js.Array.mapi((textBlock, index) => {
              switch (textBlock->refGet) {
              | Some(_) =>
                <RN.Text
                  key={index->string_of_int}
                  style={theme##mentionTextInput##highlightText}>
                  {textBlock->textGet->React.string}
                </RN.Text>
              | None =>
                <RN.Text key={index->string_of_int}>
                  {textBlock->textGet->React.string}
                </RN.Text>
              }
            })
         |> React.array}
      </RN.Text>
    </TextInput>
    {showSuggestions
       ? <RN.View style=theme##mentionTextInput##suggestionWrapper>
           {renderSuggestionList(searchValue, handleSuggestionPress)}
         </RN.View>
       : React.null}
  </RN.View>;
};

let default = Helpers.injectTheme(make);
