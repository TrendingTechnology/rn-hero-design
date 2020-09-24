open ReactNative;

let noop = _ => ();

module DateTimePickerIOS = {
  [@react.component]
  let make = (~show, ~mode, ~value, ~onChange, ~onDismiss, ~theme) => {
    let (pickedDate, setPickedDate) = React.useState(() => value);
    let handleSelect =
      React.useCallback1(
        _ => {
          onChange(pickedDate);
          onDismiss();
          ();
        },
        [|pickedDate|],
      );
    let handleCancel =
      React.useCallback(_ => {
        onDismiss();
        ();
      });
    let handleKeyboardWillShow =
      React.useCallback(_ => {
        onDismiss();
        ();
      });
    let handleChange =
      (. _, date) => {
        setPickedDate(_ => date);
        ();
      };

    React.useEffect2(
      _ => {
        if (show) {
          Keyboard.dismiss();
        };
        let keyboardWillShowListener =
          Keyboard.addListener(`keyboardWillShow, handleKeyboardWillShow);
        setPickedDate(_ => value);
        Some(() => EventSubscription.remove(keyboardWillShowListener));
      },
      (show, value),
    );

    if (!show) {
      React.null;
    } else {
      <RNSafeAreaView
        forceInset={"bottom": "always", "top": "never"}
        style=theme##dateTimePicker##wrapper>
        <View style=theme##dateTimePicker##actions>
          <TouchableOpacity
            onPress=handleCancel style=theme##dateTimePicker##action>
            <Text style=theme##dateTimePicker##actionText>
              "Cancel"->React.string
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress=handleSelect style=theme##dateTimePicker##action>
            <Text
              style={StyleSheet.flatten([|
                theme##dateTimePicker##actionText,
                Style.style(~fontWeight=`_600, ()),
              |])}>
              "Done"->React.string
            </Text>
          </TouchableOpacity>
        </View>
        <RNCDateTimePicker
          mode
          display=`spinner
          value=pickedDate
          onChange=handleChange
        />
      </RNSafeAreaView>;
    };
  };
};

module DateTimePickerAndroid = {
  [@react.component]
  let make = (~show, ~mode, ~value, ~onChange, ~onDismiss) => {
    React.useEffect1(
      () => {
        if (show) {
          if (mode === `date) {
            let datePickerOptions =
              DatePickerAndroid.options(
                ~date=DatePickerAndroid.calendarDate(value),
                (),
              );

            let _promise =
              Js.Promise.(
                DatePickerAndroid.open_(datePickerOptions)
                |> then_((response: DatePickerAndroid.response) => {
                     if (response.action === DatePickerAndroid.dateSetAction) {
                       let newDate =
                         Js.Date.makeWithYMD(
                           ~year=response.year->float_of_int,
                           ~month=response.month->float_of_int,
                           ~date=response.day->float_of_int,
                           (),
                         );
                       onChange(newDate);
                     };
                     onDismiss();
                     resolve();
                   })
              );
            ();
          };
        };
        None;
      },
      [|show|],
    );

    React.null;
  };
};

[@react.component]
let make =
    (
      ~show=false,
      ~value: Js.Date.t=Js.Date.make(),
      ~onChange=noop,
      ~onDismiss=noop,
      ~theme=Hero_Theme.default,
    ) =>
  Helpers.Platform.isAndroid
    ? <DateTimePickerAndroid show mode=`date value onChange onDismiss />
    : <DateTimePickerIOS show mode=`date value onChange onDismiss theme />;

let default = Helpers.injectTheme(make);
