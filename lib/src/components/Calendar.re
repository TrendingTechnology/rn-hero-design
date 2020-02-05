open ReactNative;

let emptyStyle = Style.style();

let noop = _ => ();

let _DAYS_OF_WEEK = [|"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"|];

let monthOfInt =
  fun
  | 0 => "January"
  | 1 => "February"
  | 2 => "March"
  | 3 => "April"
  | 4 => "May"
  | 5 => "June"
  | 6 => "July"
  | 7 => "August"
  | 8 => "September"
  | 9 => "October"
  | 10 => "November"
  | 11 => "December"
  | _ => "";

let formatTitleString = date =>
  Js.Date.(
    date->getMonth->int_of_float->monthOfInt
    ++ " "
    ++ date->getFullYear->int_of_float->string_of_int
  );

let eqDate = (date1, date2) =>
  Js.Date.(toDateString(date1) === toDateString(date2));

[@react.component]
let make =
    (
      ~value=Js.Date.make(),
      ~onChange=noop,
      ~currentView=Js.Date.make(),
      ~onPressPrev=noop,
      ~onPressNext=noop,
      ~onPressTitle=noop,
      ~theme=Hero_Theme.default,
    ) => {
  open Js.Date;

  let currentYear = getFullYear(currentView);
  let currentMonth = getMonth(currentView);
  let now = Js.Date.make();

  /* 0 -> 6 */
  let firstDayOfMonth =
    makeWithYMD(~year=currentYear, ~month=currentMonth, ~date=1.0, ())
    ->getDay
    ->int_of_float;

  /* 0 -> 6 */
  let lastDayOfMonth =
    makeWithYMD(~year=currentYear, ~month=currentMonth +. 1.0, ~date=0.0, ())
    ->getDay
    ->int_of_float;

  /* 29, 30, 31 */
  let lastDateOfMonth =
    makeWithYMD(~year=currentYear, ~month=currentMonth +. 1.0, ~date=0.0, ())
    ->getDate
    ->int_of_float;

  /* 29, 30, 31 */
  let lastDateOfPreviousMonth =
    makeWithYMD(~year=currentYear, ~month=currentMonth, ~date=0.0, ())
    ->getDate
    ->int_of_float;

  let daysOfPreviousMonth =
    Array.init(
      firstDayOfMonth,
      index => {
        let reversedIndex = firstDayOfMonth - index - 1;
        lastDateOfPreviousMonth
        ->(-)(reversedIndex)
        ->float_of_int
        ->makeWithYMD(
            ~year=currentYear,
            ~month=currentMonth -. 1.0,
            ~date=_,
            (),
          );
      },
    );

  let daysOfCurrentMonth =
    Array.init(lastDateOfMonth, index =>
      index
      ->(+)(1)
      ->float_of_int
      ->makeWithYMD(~year=currentYear, ~month=currentMonth, ~date=_, ())
    );

  let daysOfNextMonth =
    Array.init(6 - lastDayOfMonth, index =>
      index
      ->(+)(1)
      ->float_of_int
      ->makeWithYMD(
          ~year=currentYear,
          ~month=currentMonth +. 1.0,
          ~date=_,
          (),
        )
    );

  <View style=theme##calendar##wrapper>
    <View style=theme##calendar##header>
      <TouchableOpacity onPress=noop style=theme##calendar##headerButton>
        <Icon icon="single-right-outline" size=20.0 />
      </TouchableOpacity>
      <TouchableOpacity onPress=noop style=theme##calendar##headerButton>
        <Text style=theme##calendar##headerTitle>
          {currentView->formatTitleString->React.string}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress=noop style=theme##calendar##headerButton>
        <Icon icon="single-right-outline" size=20.0 />
      </TouchableOpacity>
    </View>
    <View style=theme##calendar##monthView>
      {_DAYS_OF_WEEK
       |> Array.map(dayName =>
            <View key=dayName style=theme##calendar##day>
              <Text
                style={StyleSheet.flatten([|
                  theme##calendar##dayText,
                  theme##calendar##dayName,
                |])}>
                dayName->React.string
              </Text>
            </View>
          )
       |> React.array}
      {daysOfPreviousMonth
       |> Array.map(date =>
            <View key={toDateString(date)} style=theme##calendar##day>
              <Text
                style={StyleSheet.flatten([|
                  theme##calendar##dayText,
                  theme##calendar##blurredDayText,
                |])}>
                {date->getDate->int_of_float->string_of_int->React.string}
              </Text>
            </View>
          )
       |> React.array}
      {daysOfCurrentMonth
       |> Array.map(date =>
            <View key={toDateString(date)} style=theme##calendar##day>
              <View
                style={
                  eqDate(value, date)
                    ? theme##calendar##selectedDay : emptyStyle
                }
              />
              <Text
                style={StyleSheet.flatten([|
                  theme##calendar##dayText,
                  eqDate(now, date)
                    ? theme##calendar##currentDayText : emptyStyle,
                  eqDate(value, date)
                    ? theme##calendar##selectedDayText : emptyStyle,
                |])}>
                {date->getDate->int_of_float->string_of_int->React.string}
              </Text>
            </View>
          )
       |> React.array}
      {daysOfNextMonth
       |> Array.map(date =>
            <View key={toDateString(date)} style=theme##calendar##day>
              <Text
                style={StyleSheet.flatten([|
                  theme##calendar##dayText,
                  theme##calendar##blurredDayText,
                |])}>
                {date->getDate->int_of_float->string_of_int->React.string}
              </Text>
            </View>
          )
       |> React.array}
    </View>
  </View>;
};

let default = make;
