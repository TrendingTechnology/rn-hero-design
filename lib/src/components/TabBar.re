open ReactNative;

[@bs.set]
external setTabSubComponent:
  (React.component('props1), React.component('props2)) => unit =
  "Tab";

[@bs.get]
external getTabProps:
  React.element =>
  {
    ..
    "title": option(React.element),
    "children": option(React.element),
  } =
  "props";

[@bs.module "react"] [@bs.scope "Children"] [@bs.val]
external toArray: React.element => array(React.element) = "toArray";

let emptyStyle = Style.style();

let noop = _ => ();

module Tab = {
  [@react.component]
  let make = (~_title=?, ~_children=?) => React.null;
};

[@react.component]
let make =
    (~selectedIndex=0, ~onSelect=noop, ~children, ~theme=Hero_Theme.default) => {
  let children = children->toArray;

  let titles: array(React.element) =
    children
    ->Belt.Array.map(child => getTabProps(child)##title)
    ->Belt.Array.mapWithIndex((index, title) => {
        let title = title->Belt.Option.getWithDefault(React.null);
        <TouchableOpacity
          key={index->string_of_int}
          onPress={_ => onSelect(index)}
          style={StyleSheet.flatten([|
            theme##tabBar##tab,
            index === selectedIndex ? theme##tabBar##selectedTab : emptyStyle,
          |])}>
          title
        </TouchableOpacity>;
      });

  let contents: array(React.element) =
    children
    ->Belt.Array.map(child => getTabProps(child)##children)
    ->Belt.Array.mapWithIndex((index, child) => {
        let child = child->Belt.Option.getWithDefault(React.null);
        switch (index) {
        | index when index == selectedIndex => child
        | _ => React.null
        };
      });

  <View style={StyleSheet.flatten([|theme##tabBar##wrapper|])}>
    <View style={StyleSheet.flatten([|theme##tabBar##navigator|])}>
      titles->ReasonReact.array
    </View>
    <View style={StyleSheet.flatten([|theme##tabBar##wrapper|])}>
      contents->ReasonReact.array
    </View>
  </View>;
};

setTabSubComponent(make, Tab.make);

let default = make;
