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

let getSelectedMentionIndexes = (selection, mentions) => {
  mentions->Belt.Array.reduceWithIndex(
    [||],
    (indexes, mention, index) => {
      let offset = mention->offsetGet;
      let isSelected =
        fst(offset) < snd(selection) && snd(offset) > fst(selection);

      if (isSelected) {
        Array.append(indexes, [|index|]);
      } else {
        indexes;
      };
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

let not = value => !value;

[@react.component]
let make = (~value, ~onChange, ~theme=Hero_Theme.default) => {
  let valueText = React.useRef("");
  let mentions = React.useRef([||]);
  let affectedMentions = React.useRef({selected: [||], unselected: [||]});

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
      let selection = event##nativeEvent##selection;
      let selectionRange = (selection##start, selection##_end);
      let setSelectedMentions = () =>
        React.Ref.(
          setCurrent(
            affectedMentions,
            getAffectedMentionIndexes(selectionRange, current(mentions)),
          )
        );
      delay(setSelectedMentions);
    });

  let handleChange =
    React.useCallback(event => {
      let affectedMentions = React.Ref.current(affectedMentions);
      let mentions = React.Ref.current(mentions);
      if (Array.length(affectedMentions.selected) > 0) {
        let restMentions =
          mentions
          |> Js.Array.filteri((mention, index) =>
               affectedMentions.selected |> Js.Array.includes(index) |> not
             );
        Js.log("FORCE ONCHANGE");
        let parsedMessage: message =
          parseMessage(event##nativeEvent##text, restMentions);
        onChange(parsedMessage);
        /* Js.log(affectedMentions); */
        /* Js.log(restMentions->Belt.Array.map(nameGet)); */
        ();
      };
    });

  let handleChangeText =
    React.useCallback(text => {
      let valueText_ = React.Ref.current(valueText);
      let mentions_ = React.Ref.current(mentions);
      let diff = String.length(text) - String.length(valueText_);
      let unselectedMentionIndexes =
        React.Ref.current(affectedMentions).unselected;

      React.Ref.setCurrent(valueText, text);

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

      ();
    });

  <TextInput
    onChange=handleChange
    onChangeText=handleChangeText
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
  </TextInput>;
};

let default = make;
