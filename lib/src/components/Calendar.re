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

let formatString = float_ => float_->int_of_float->string_of_int;

let formatTitleString = date =>
  Js.Date.(
    date->getMonth->int_of_float->monthOfInt
    ++ " "
    ++ date->getFullYear->formatString
  );

let eqDate = (date1, date2) =>
  Js.Date.(toDateString(date1) === toDateString(date2));

type color = string;

[@bs.deriving abstract]
type markedDate = {
  date: Js.Date.t,
  colors: array(color),
};

type markedDates = array(markedDate);

type parsedMarkedDates = Js.Dict.t(array(color));

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
      ~markedDates: markedDates=[||],
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

  let parsedMarkedDates =
    markedDates->Belt.Array.reduce(
      Js.Dict.empty(),
      (parsedMarkedDates, mark) => {
        let markedDateString = Js.Date.toDateString(dateGet(mark));

        switch (parsedMarkedDates->Js.Dict.get(markedDateString)) {
        | None =>
          parsedMarkedDates->Js.Dict.set(markedDateString, colorsGet(mark));
          parsedMarkedDates;
        | Some(colors) =>
          parsedMarkedDates->Js.Dict.set(
            markedDateString,
            Array.concat([colors, colorsGet(mark)]),
          );
          parsedMarkedDates;
        };
      },
    );

  let renderMarks = date =>
    switch (parsedMarkedDates->Js.Dict.get(toDateString(date))) {
    | Some(colors) =>
      <View style=theme##calendar##markedDay>
        {colors
         ->Belt.Array.map(color =>
             <View
               key=color
               style={StyleSheet.flatten([|
                 theme##calendar##mark,
                 Style.style(~backgroundColor=color, ()),
               |])}
             />
           )
         ->React.array}
      </View>
    | None => React.null
    };

  <View style=theme##calendar##wrapper>
    <View style=theme##calendar##header>
      <TouchableOpacity
        onPress=onPressPrev style=theme##calendar##headerButton>
        <Icon icon="single-left-outline" size=20.0 />
      </TouchableOpacity>
      <TouchableOpacity
        onPress=onPressTitle style=theme##calendar##headerButton>
        <Text style=theme##calendar##headerTitle>
          {currentView->formatTitleString->React.string}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress=onPressNext style=theme##calendar##headerButton>
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
                  dayName === "Sun"
                    ? theme##calendar##dayNameSunday : emptyStyle,
                |])}>
                dayName->React.string
              </Text>
            </View>
          )
       |> React.array}
      {daysOfPreviousMonth
       |> Array.map(date =>
            <TouchableOpacity
              key={toDateString(date)}
              onPress={_ => onChange(date)}
              style=theme##calendar##day>
              {renderMarks(date)}
              <Text
                style={StyleSheet.flatten([|
                  theme##calendar##dayText,
                  theme##calendar##blurredDayText,
                |])}>
                {date->getDate->formatString->React.string}
              </Text>
            </TouchableOpacity>
          )
       |> React.array}
      {daysOfCurrentMonth
       |> Array.map(date =>
            <TouchableOpacity
              key={toDateString(date)}
              onPress={_ => onChange(date)}
              style=theme##calendar##day>
              <View
                style={
                  eqDate(value, date)
                    ? theme##calendar##selectedDay : emptyStyle
                }
              />
              {renderMarks(date)}
              <Text
                style={StyleSheet.flatten([|
                  theme##calendar##dayText,
                  eqDate(now, date)
                    ? theme##calendar##currentDayText : emptyStyle,
                  eqDate(value, date)
                    ? theme##calendar##selectedDayText : emptyStyle,
                |])}>
                {date->getDate->formatString->React.string}
              </Text>
            </TouchableOpacity>
          )
       |> React.array}
      {daysOfNextMonth
       |> Array.map(date =>
            <TouchableOpacity
              key={toDateString(date)}
              onPress={_ => onChange(date)}
              style=theme##calendar##day>
              {renderMarks(date)}
              <Text
                style={StyleSheet.flatten([|
                  theme##calendar##dayText,
                  theme##calendar##blurredDayText,
                |])}>
                {date->getDate->formatString->React.string}
              </Text>
            </TouchableOpacity>
          )
       |> React.array}
    </View>
  </View>;
};

let default = Helpers.injectTheme(make);
