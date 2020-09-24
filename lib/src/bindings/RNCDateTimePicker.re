module ChangeEvent = {
  type payload = {target: int};

  include ReactNative.Event.SyntheticEvent({
    type _payload = payload;
  });
};

type changeEvent = ChangeEvent.t;

[@react.component] [@bs.module "@react-native-community/datetimepicker"]
external make:
  (
    ~testID: string=?,
    ~mode: [@bs.string] [ | `date | `time]=?,
    ~display: [@bs.string] [
                | `default
                | `spinner
                | `compact
                | `inline
                | `calendar
                | `clock
              ]
                =?,
    ~value: Js.Date.t,
    ~onChange: (. changeEvent, Js.Date.t) => unit
  ) =>
  React.element =
  "default";
