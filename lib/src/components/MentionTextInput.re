module RN = ReactNative;

[@bs.deriving abstract]
type mention = {
  mid: string,
  name: string,
  offset: (int, int),
};

type mentions = array(mention);

[@bs.deriving abstract]
type textBlock = {
  text: string,
  id: option(string),
};

type message = array(textBlock);

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
          if (id->Belt.Option.isSome) {
            Belt.Array.concat(
              mentions,
              [|
                mention(
                  ~mid=id->Belt.Option.getExn,
                  ~name=text,
                  ~offset=(startOffset^, endOffset + 1) // so tricky
                ),
              |],
            );
          } else {
            mentions;
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

let getAffectedMentionIndexes = (selection, mentions) => {
  let init: affectedMentionIndexes = {selected: [||], unselected: [||]};

  mentions->Belt.Array.reduceWithIndex(
    init,
    (indexes, mention, index) => {
      let offset = mention->offsetGet;
      let isUnselected = fst(offset) >= snd(selection);
      let isSelected =
        fst(offset) < snd(selection) && snd(offset) > fst(selection);

      if (isSelected) {
        {...indexes, selected: Array.append(indexes.selected, [|index|])};
      } else if (isUnselected) {
        {
          ...indexes,
          unselected: Array.append(indexes.unselected, [|index|]),
        };
      } else {
        indexes;
      };
    },
  );
};

[@bs.val] external setTimeout: (unit => unit, int) => unit = "setTimeout";
let delay = func => setTimeout(func, 0);

let _ACTIVATOR = "@";

[@react.component]
let make =
    (
      ~value,
      ~onChange,
      ~suggestionData,
      ~renderSuggestionItem,
      ~renderSuggestionList,
      ~theme=Hero_Theme.default,
    ) => {
  let valueText = React.useRef("");
  let mentions = React.useRef([||]);
  let affectedMentions = React.useRef({selected: [||], unselected: [||]});
  let latestKey = React.useRef("");
  let latestPosition = React.useRef(0);
  let searchPosition = React.useRef(0);
  let (showSuggestions, setShowSuggestions) = React.useState(() => false);
  let (searchValue, setSearchValue) = React.useState(() => "");

  React.useEffect1(
    () => {
      open React.Ref;
      setCurrent(
        valueText,
        value->Belt.Array.map(textGet)->Js.Array.joinWith("", _),
      );
      setCurrent(mentions, getMentionsFromMessage(value));
      None;
    },
    [|value|],
  );

  let handleSelectionChange =
    React.useCallback(event => {
      open React.Ref;
      Js.log("HANDLE SELECTION");
      let selection = event##nativeEvent##selection;
      let selectionRange = (selection##start, selection##_end);

      let setAffectedMentions = () =>
        setCurrent(
          affectedMentions,
          getAffectedMentionIndexes(selectionRange, current(mentions)),
        );
      setCurrent(latestPosition, selection##start);
      setTimeout(setAffectedMentions, 5);
    });

  let handleKeyPress =
    React.useCallback(event => {
      Js.log("HANDLE KEY PRESS");
      let key = event##nativeEvent##key;
      React.Ref.setCurrent(latestKey, key);
    });

  let handleChangeText =
    React.useCallback(text =>
      setTimeout(
        () => {
          open React.Ref;

          Js.log("HANDLE CHANGE TEXT");
          let valueText_ = React.Ref.current(valueText);
          let mentions_ = React.Ref.current(mentions);
          let affectedMentions = React.Ref.current(affectedMentions);
          let diff = String.length(text) - String.length(valueText_);
          let unselectedMentionIndexes = affectedMentions.unselected;

          React.Ref.setCurrent(valueText, text);

          if (Array.length(affectedMentions.selected) > 0) {
            let restMentions =
              mentions_
              |> Js.Array.filteri((mention, index) =>
                   affectedMentions.selected
                   |> Js.Array.includes(index)
                   |> (!)
                 );
            Js.log("FORCE ONCHANGE");
            let parsedMessage: message = parseMessage(text, restMentions);
            onChange(parsedMessage);
            /* Js.log(affectedMentions); */
            /* Js.log(restMentions->Belt.Array.map(nameGet)); */
          };

          let updatedMentions =
            unselectedMentionIndexes->Belt.Array.reduce(
              mentions_,
              (updatedMentions, index) => {
                let currentMention = updatedMentions[index];
                Belt.Array.setUnsafe(
                  updatedMentions,
                  index,
                  mention(
                    ~mid=midGet(currentMention),
                    ~name=nameGet(currentMention),
                    ~offset=(
                      currentMention->offsetGet->fst + diff,
                      currentMention->offsetGet->snd + diff,
                    ),
                  ),
                );
                updatedMentions;
              },
            );

          /* Js.log(mentions_); */
          /* Js.log(updatedMentions); */

          React.Ref.setCurrent(mentions, updatedMentions);

          /* handle showing suggestions */
          let latestKey_ = React.Ref.current(latestKey);
          let latestPosition_ = React.Ref.current(latestPosition);
          let previousChar =
            text->Js.String.get(latestPosition_ - 2)->Js.String.make;

          if (!showSuggestions) {
            if (latestKey_ === _ACTIVATOR
                && previousChar->Js.Array.includes([|"undefined", " ", "\n"|])) {
              setShowSuggestions(_ => true);
              setCurrent(searchPosition, latestPosition_);
            };
          } else {
            let searchValue =
              Js.String.substring(
                ~from=current(searchPosition),
                ~to_=latestPosition_,
                text,
              );
            setSearchValue(_ => searchValue);
          };
        },
        4,
      )
    );

  let handleSuggestionPress = (mid, name) => {
    open React.Ref;
    let valueText_ = current(valueText);
    let affectedMentions_ = current(affectedMentions);
    let mentions_ = current(mentions);

    let temp =
      affectedMentions_.unselected
      ->Belt.Array.get(0)
      ->Belt.Option.getWithDefault(Array.length(mentions_));

    let updatedValueText =
      Js.String.substring(~from=0, ~to_=current(searchPosition), valueText_)
      ++ name
      ++ " "
      ++ Js.String.substringToEnd(~from=current(searchPosition), valueText_);

    let temp2 =
      Js.Array.spliceInPlace(
        ~pos=temp,
        ~remove=0,
        ~add=[|mention(~mid, ~name="@" ++ name, ~offset=((-1), (-1)))|],
        mentions_,
      );

    Js.log(mentions_);

    let parsedMessage: message = parseMessage(updatedValueText, mentions_);
    onChange(parsedMessage);
    ();
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
