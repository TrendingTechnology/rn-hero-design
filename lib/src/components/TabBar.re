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
  let make = () => React.null;
};

[@react.component]
let make =
    (
      ~selectedIndex=0,
      ~onSelect=noop,
      ~children,
      ~wrapperStyle=emptyStyle,
      ~tabStyle=emptyStyle,
      ~contentStyle=emptyStyle,
      ~theme=Hero_Theme.default,
    ) => {
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
            tabStyle,
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

  <View style={StyleSheet.flatten([|theme##tabBar##wrapper, wrapperStyle|])}>
    <View style={StyleSheet.flatten([|theme##tabBar##navigator|])}>
      titles->ReasonReact.array
    </View>
    <View
      style={StyleSheet.flatten([|theme##tabBar##content, contentStyle|])}>
      contents->ReasonReact.array
    </View>
  </View>;
};

setTabSubComponent(make, Tab.make);

let default = Helpers.injectTheme(make);
