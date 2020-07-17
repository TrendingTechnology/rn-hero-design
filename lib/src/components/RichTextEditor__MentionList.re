open ReactNative;

let isEmptyString = string_ => String.length(string_) == 0;

let emitter = RichTextEditor__Event.emitter;

[@react.component]
let make = (~name: string, ~render, ~theme=Hero_Theme.default) => {
  module Option = Belt.Option;
  module Json = Js.Json;
  module Dict = Js.Dict;

  let normalizeEventName = event => {j|$name/$event|j};

  let (search, setSearch) = React.useState(() => "");
  let (target, setTarget) = React.useState(() => Json.null);

  React.useEffect0(() => {
    let removeMentionSearchListener =
      Events.on'(
        emitter,
        normalizeEventName("mention-search"),
        data => {
          let search =
            data
            ->Option.flatMap(Json.decodeObject)
            ->Option.flatMap(data => Dict.get(data, "search"))
            ->Option.flatMap(Json.decodeString)
            ->Option.getExn;

          let target =
            data
            ->Option.flatMap(Json.decodeObject)
            ->Option.flatMap(data => Dict.get(data, "target"))
            ->Option.getExn;

          setSearch(_ => search);
          setTarget(_ => target);
        },
      );

    Some(() => removeMentionSearchListener());
  });

  isEmptyString(search)
    ? React.null
    : <View style=theme##richTextEditor##suggestionList>
        {render(
           search,
           (id, name) => {
             let meta = Dict.empty();
             Dict.set(meta, "target", target);

             let data = Dict.empty();
             Dict.set(data, "id", Json.string(id));
             Dict.set(data, "name", Json.string(name));
             Dict.set(data, "meta", Json.object_(meta));

             Events.emit(
               emitter,
               normalizeEventName("mention-apply"),
               Some(Json.object_(data)),
             );
           },
         )}
      </View>;
};

let default = Helpers.injectTheme(make);
