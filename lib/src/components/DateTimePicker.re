open ReactNative;

type mode = [ | `date | `datetime];

let noop = _ => ();

module DateTimePickerIOS = {
  [@react.component]
  let make = (~show, ~mode, ~value, ~onChange, ~onDismiss) => {
    let (pickedDate, setPickedDate) = React.useState(() => value);
    let handleChange =
      React.useCallback1(
        _ => {
          onChange(pickedDate);
          onDismiss();
          ();
        },
        [|pickedDate|],
      );
    let handleDismiss =
      React.useCallback(_ => {
        onDismiss();
        ();
      });
    let handleKeyboardWillShow =
      React.useCallback(_ => {
        onDismiss();
        ();
      });
    let handleDateChange =
      React.useCallback(date => {
        setPickedDate(_ => date);
        ();
      });

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
      <RNSafeAreaView forceInset={"bottom": "always"}>
        <View>
          <TouchableOpacity onPress=handleDismiss>
            <Text> "Cancel"->React.string </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress=handleChange>
            <Text> "Done"->React.string </Text>
          </TouchableOpacity>
        </View>
        <DatePickerIOS mode date=pickedDate onDateChange=handleDateChange />
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
                |> then_(response => {
                     if (response##action === DatePickerAndroid.dateSetAction) {
                       let newDate =
                         Js.Date.makeWithYMD(
                           ~year=response##year->float_of_int,
                           ~month=response##month->float_of_int,
                           ~date=response##day->float_of_int,
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
      ~mode=`date,
      ~value: Js.Date.t=Js.Date.make(),
      ~onChange=noop,
      ~onDismiss=noop,
    ) =>
  Helpers.Platform.isAndroid
    ? <DateTimePickerAndroid show mode value onChange onDismiss />
    : <DateTimePickerIOS show mode value onChange onDismiss />;

let default = make;
