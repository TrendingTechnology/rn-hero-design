open ReactNative;

let emptyStyle = Style.style();

let noop = _ => ();

let _DAYS_OF_WEEK = [|"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"|];

let monthOfInt =
  fun
  | 0 => "Jan"
  | 1 => "Feb"
  | 2 => "Mar"
  | 3 => "Apr"
  | 4 => "May"
  | 5 => "Jun"
  | 6 => "Jul"
  | 7 => "Aug"
  | 8 => "Sep"
  | 9 => "Oct"
  | 10 => "Nov"
  | 11 => "Dec"
  | _ => "";

let getFirstDateOfMonth = date =>
  Js.Date.(
    makeWithYMD(
      ~year=getFullYear(date),
      ~month=getMonth(date),
      ~date=1.0,
      (),
    )
  );

let getLastDateOfMonth = date =>
  Js.Date.(
    makeWithYMD(
      ~year=getFullYear(date),
      ~month=getMonth(date) +. 1.0,
      ~date=0.0,
      (),
    )
  );

let getLastDateOfPreviousMonth = date =>
  Js.Date.(
    makeWithYMD(
      ~year=getFullYear(date),
      ~month=getMonth(date),
      ~date=0.0,
      (),
    )
  );

[@react.component]
let make =
    (
      ~value=Js.Date.make(),
      ~onChange=noop,
      ~currentView=Js.Date.make(),
      ~onChangeView=noop,
      ~theme=Hero_Theme.default,
    ) => {
  open Js.Date;

  let firstDayOfMonth =
    getFirstDateOfMonth(currentView)->getDay->int_of_float;

  let lastDayOfMonth = getLastDateOfMonth(currentView)->getDay->int_of_float;

  let lastDateOfMonth =
    getLastDateOfMonth(currentView)->getDate->int_of_float;

  let lastDateOfPreviousMonth =
    getLastDateOfPreviousMonth(currentView)->getDate->int_of_float;

  let daysOfPreviousMonth =
    Array.init(
      firstDayOfMonth,
      index => {
        let reversedIndex = firstDayOfMonth - index - 1;
        lastDateOfPreviousMonth->(-)(reversedIndex)->string_of_int;
      },
    );

  let daysOfCurrentMonth =
    Array.init(lastDateOfMonth, index => index->(+)(1)->string_of_int);

  let daysOfNextMonth =
    Array.init(6 - lastDayOfMonth, index => index->(+)(1)->string_of_int);

  <View style=theme##calendar##wrapper>
    <View style=theme##calendar##navigator>
      <Icon icon="single-right-outline" size=20.0 />
      <Text>
        {getFullYear(currentView)->int_of_float->string_of_int->React.string}
        " "->React.string
        {getMonth(currentView)->int_of_float->monthOfInt->React.string}
      </Text>
      <Icon icon="single-right-outline" size=20.0 />
    </View>
    <View style=theme##calendar##dayContainer>
      {_DAYS_OF_WEEK
       |> Array.map(day =>
            <View style=theme##calendar##day>
              <Text
                style={StyleSheet.flatten([|
                  theme##calendar##dayText,
                  theme##calendar##dayLabel,
                |])}>
                day->React.string
              </Text>
            </View>
          )
       |> React.array}
      {daysOfPreviousMonth
       |> Array.map(date =>
            <View style=theme##calendar##day>
              <Text style=theme##calendar##dayText> date->React.string </Text>
            </View>
          )
       |> React.array}
      {daysOfCurrentMonth
       |> Array.map(date =>
            <View style=theme##calendar##day>
              <View
                style={StyleSheet.flatten([|
                  getDate(value)->int_of_float->string_of_int->(===)(date)
                  && getMonth(value)->(===)(getMonth(currentView))
                  && getFullYear(value)->(===)(getFullYear(currentView))
                    ? theme##calendar##selectedDay : emptyStyle,
                |])}
              />
              <Text
                style={StyleSheet.flatten([|
                  theme##calendar##dayText,
                  theme##calendar##currentDayText,
                |])}>
                date->React.string
              </Text>
            </View>
          )
       |> React.array}
      {daysOfNextMonth
       |> Array.map(date =>
            <View style=theme##calendar##day>
              <Text style=theme##calendar##dayText> date->React.string </Text>
            </View>
          )
       |> React.array}
    </View>
  </View>;
};

let default = make;
