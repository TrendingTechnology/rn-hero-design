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
let getAffectedMentionIndexes = (selection, mentions) => {
  let init: affectedMentionIndexes = {selected: [||], unselected: [||]};

  mentions->Belt.Array.reduceWithIndex(
    init,
    (indexes, mention, index) => {
      let offset = mention->offsetGet;
      let {selected, unselected} = indexes;
      let isUnselected = fst(offset) >= snd(selection);
      let isSelected =
        fst(offset) < snd(selection) && snd(offset) > fst(selection);

      if (isSelected) {
        {...indexes, selected: Array.append(selected, [|index|])};
      } else if (isUnselected) {
        {...indexes, unselected: Array.append(unselected, [|index|])};
      } else {
        indexes;
      };
    },
  );
};

let _ACTIVATOR = "@";

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

  let latestKey = React.useRef("");
  let latestPosition = React.useRef(0);
  let searchPosition = React.useRef(0);
  let affectedMentions = React.useRef({selected: [||], unselected: [||]});

  let (showSuggestions, setShowSuggestions) = React.useState(() => false);
  let (searchValue, setSearchValue) = React.useState(() => "");

  React.useEffect1(
    () => {
      open Js.Array;
      setCurrent(valueText, value |> map(textGet) |> joinWith(""));
      setCurrent(mentions, value |> getMentionsFromMessage);
      None;
    },
    [|value|],
  );

  let handleSelectionChange =
    React.useCallback(event => {
      let selection = event##nativeEvent##selection;
      let selectionRange = (selection##start, selection##_end);
      let setAffectedMentions = () =>
        setCurrent(
          affectedMentions,
          getAffectedMentionIndexes(selectionRange, current(mentions)), /* TODO: latest mentions, is it right? */
        );
      setCurrent(latestPosition, selection##start);
      setTimeout(setAffectedMentions, 5); /* when users press a key, selection change will be triggered first and we don't want that */
    });

  let handleKeyPress =
    React.useCallback(event => {
      let key = event##nativeEvent##key;
      setCurrent(latestKey, key);
    });

  let handleMentionRemove = text => {
    let mentions = current(mentions);
    let selectedMentions = current(affectedMentions).selected;

    if (Array.length(selectedMentions) > 0) {
      let restMentions =
        mentions
        |> Js.Array.filteri((_, index) =>
             selectedMentions |> Js.Array.includes(index) |> (!)
           );
      let parsedMessage = parseMessage(text, restMentions);
      onChange(parsedMessage);
    };
  };

  let handleMentionOffsetChange = text => {
    let valueText = current(valueText);
    let mentions = current(mentions);
    let unselectedMentions = current(affectedMentions).unselected;
    let lenDiff = String.(length(text) - length(valueText));

    unselectedMentions->Belt.Array.reduce(
      mentions,
      (mentions, index) => {
        let unselectedMention = mentions[index];

        Belt.Array.setUnsafe(
          mentions,
          index,
          mention(
            ~mid=midGet(unselectedMention),
            ~name=nameGet(unselectedMention),
            ~offset=(
              unselectedMention->offsetGet->fst->(+)(lenDiff),
              unselectedMention->offsetGet->snd->(+)(lenDiff),
            ),
          ),
        );

        mentions;
      },
    );
  };

  let handleChangeText =
    React.useCallback(text =>
      setTimeout(
        () => {
          Js.log("HANDLE CHANGE TEXT");
          let valueText_ = React.Ref.current(valueText);
          let mentions_ = React.Ref.current(mentions);
          let affectedMentions = React.Ref.current(affectedMentions);
          let diff = String.length(text) - String.length(valueText_);
          let unselectedMentionIndexes = affectedMentions.unselected;

          React.Ref.setCurrent(valueText, text);

          /* TODO: if remove, do we still need to update offset? */
          handleMentionRemove(text);

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
