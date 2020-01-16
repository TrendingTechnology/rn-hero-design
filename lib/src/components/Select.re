open ReactNative;

type option_ = {
  .
  "label": string,
  "value": string,
};

[@react.component]
let make =
    (
      ~options: array(option_)=[||],
      ~show,
      ~value,
      ~onChange,
      ~onDismiss,
      ~theme=Hero_Theme.default,
    ) => {
  let (pickedValue, setPickedValue) = React.useState(() => value);
  let handleChange =
    React.useCallback1(
      _ => {
        onChange(pickedValue);
        onDismiss();
        ();
      },
      [|pickedValue|],
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
  let handleValueChange =
    React.useCallback((value, _) => {
      setPickedValue(_ => value);
      ();
    });

  React.useEffect2(
    _ => {
      if (show) {
        Keyboard.dismiss();
      };
      let keyboardWillShowListener =
        Keyboard.addListener(`keyboardWillShow, handleKeyboardWillShow);
      setPickedValue(_ => value);
      Some(() => EventSubscription.remove(keyboardWillShowListener));
    },
    (show, value),
  );

  if (!show) {
    React.null;
  } else {
    <RNSafeAreaView
      forceInset={"bottom": "always"} style=theme##select##wrapper>
      <View style=theme##select##actions>
        <TouchableOpacity onPress=handleDismiss style=theme##select##action>
          <Text style=theme##select##actionText> "Cancel"->React.string </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress=handleChange style=theme##select##action>
          <Text
            style={StyleSheet.flatten([|
              theme##select##actionText,
              Style.style(~fontWeight=`_600, ()),
            |])}>
            "Done"->React.string
          </Text>
        </TouchableOpacity>
      </View>
      <Picker
        mode=`dialog
        prompt="Hello"
        selectedValue=pickedValue
        onValueChange={(value, _) => {
          setPickedValue(_ => value);
          ();
        }}>
        {options
         ->Belt.Array.map(option =>
             <Picker.Item
               key=option##value
               label=option##label
               value=option##value
             />
           )
         ->React.array}
      </Picker>
    </RNSafeAreaView>;
  };
};

let default = make;
