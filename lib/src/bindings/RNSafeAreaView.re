[@bs.module "react-native-safe-area-view"]
external getInset: ([@bs.string] [ | `bottom | `top], option(bool)) => float =
  "getInset";

[@react.component] [@bs.module "react-native-safe-area-view"]
external make:
  (
    ~forceInset: Js.t('a)=?,
    ~style: ReactNative.Style.t=?,
    ~children: React.element=?
  ) =>
  React.element =
  "default";
