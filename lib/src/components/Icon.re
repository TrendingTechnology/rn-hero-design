open ReactNative;

[@bs.get] external getColorProperty: Style.t => Color.t = "color";

module SvgXml = {
  [@react.component] [@bs.module "react-native-svg"]
  external make: (~xml: string, ~override: Js.t('a)) => React.element =
    "SvgXml";
};

[@bs.module "../icons/email"] external email: string = "default";
[@bs.module "../icons/email-outline"]
external emailOutline: string = "default";
[@bs.module "../icons/eye"] external eye: string = "default";
[@bs.module "../icons/eye-outline"] external eyeOutline: string = "default";
[@bs.module "../icons/eye-invisible"]
external eyeInvisible: string = "default";
[@bs.module "../icons/eye-invisible-outline"]
external eyeInvisibleOutline: string = "default";
[@bs.module "../icons/ok-circle"] external okCircle: string = "default";
[@bs.module "../icons/calendar"] external calendar: string = "default";
[@bs.module "../icons/clock-circle-outline"]
external clockCircleOutline: string = "default";
[@bs.module "../icons/comment-outline"]
external commentOutline: string = "default";
[@bs.module "../icons/cancel-outline"]
external cancelOutline: string = "default";
[@bs.module "../icons/plus-circle-outline"]
external plusCircleOutline: string = "default";
[@bs.module "../icons/plus-outline"] external plusOutline: string = "default";
[@bs.module "../icons/piggy-bank-outline"]
external piggyBankOutline: string = "default";
[@bs.module "../icons/target-outline"]
external targetOutline: string = "default";
[@bs.module "../icons/single-right-outline"]
external singleRightOutline: string = "default";
[@bs.module "../icons/more-vertical"]
external moreVertical: string = "default";
[@bs.module "../icons/calendar-outline"]
external calendarOutline: string = "default";
[@bs.module "../icons/phone-outline"]
external phoneOutline: string = "default";
[@bs.module "../icons/face-id"] external faceId: string = "default";
[@bs.module "../icons/single-left-outline"]
external singleLeftOutline: string = "default";
[@bs.module "../icons/arrow-down"] external arrowDown: string = "default";
[@bs.module "../icons/arrow-up"] external arrowUp: string = "default";
[@bs.module "../icons/camera-outline"]
external cameraOutline: string = "default";
[@bs.module "../icons/paperclip"] external paperclip: string = "default";
[@bs.module "../icons/image-outline"]
external imageOutline: string = "default";
[@bs.module "../icons/file-outline"] external fileOutline: string = "default";
[@bs.module "../icons/warning-circle-outline"]
external warningCircleOutline: string = "default";
[@bs.module "../icons/warning-circle"]
external warningCircle: string = "default";
[@bs.module "../icons/radio-active"] external radioActive: string = "default";
[@bs.module "../icons/radio-inactive"]
external radioInactive: string = "default";
[@bs.module "../icons/plus-circle"] external plusCircle: string = "default";
[@bs.module "../icons/cancel-circle"]
external cancelCircle: string = "default";
[@bs.module "../icons/cancel-circle-outline"]
external cancelCircleOutline: string = "default";
[@bs.module "../icons/ok-circle-outline"]
external okCircleOutline: string = "default";
[@bs.module "../icons/folder"] external folder: string = "default";
[@bs.module "../icons/folder-outline"]
external folderOutline: string = "default";
[@bs.module "../icons/stopwatch"] external stopwatch: string = "default";
[@bs.module "../icons/stopwatch-outline"]
external stopwatchOutline: string = "default";
[@bs.module "../icons/globe"] external globe: string = "default";
[@bs.module "../icons/globe-outline"]
external globeOutline: string = "default";
[@bs.module "../icons/suitcase"] external suitcase: string = "default";
[@bs.module "../icons/suitcase-outline"]
external suitcaseOutline: string = "default";
[@bs.module "../icons/level"] external level: string = "default";
[@bs.module "../icons/level-outline"]
external levelOutline: string = "default";
[@bs.module "../icons/user"] external user: string = "default";
[@bs.module "../icons/user-outline"] external userOutline: string = "default";
[@bs.module "../icons/multiple-stars"]
external multipleStars: string = "default";
[@bs.module "../icons/multiple-users"]
external multipleUsers: string = "default";
[@bs.module "../icons/remove-circle"]
external removeCircle: string = "default";
[@bs.module "../icons/remove-circle-outline"]
external removeCircleOutline: string = "default";
[@bs.module "../icons/bell-outline"] external bellOutline: string = "default";
[@bs.module "../icons/health-bag-outline"]
external healthBagOutline: string = "default";
[@bs.module "../icons/plane-outline"]
external planeOutline: string = "default";
[@bs.module "../icons/recognition-medal-outline"]
external recognitionMedalOutline: string = "default";
[@bs.module "../icons/talk-outline"] external talkOutline: string = "default";
[@bs.module "../icons/speaker-outline"]
external speakerOutline: string = "default";
[@bs.module "../icons/home-outline"] external homeOutline: string = "default";
[@bs.module "../icons/more-horizontal"]
external moreHorizontal: string = "default";
[@bs.module "../icons/cog-outline"] external cogOutline: string = "default";
[@bs.module "../icons/search-outline"]
external searchOutline: string = "default";
[@bs.module "../icons/speaker"] external speaker: string = "default";
[@bs.module "../icons/raising-hands"]
external raisingHands: string = "default";
[@bs.module "../icons/certificate"] external certificate: string = "default";
[@bs.module "../icons/recognition-medal"]
external recognitionMedal: string = "default";
[@bs.module "../icons/birthday-cake"]
external birthdayCake: string = "default";
[@bs.module "../icons/remove"] external remove: string = "default";
[@bs.module "../icons/add"] external add: string = "default";
[@bs.module "../icons/checkmark"] external checkmark: string = "default";
[@bs.module "../icons/coins-outline"]
external coinsOutline: string = "default";
[@bs.module "../icons/number"] external number: string = "default";
[@bs.module "../icons/percentage"] external percentage: string = "default";

[@bs.module "../icons/format_bold"] external formatBold: string = "default";
[@bs.module "../icons/format_italic"]
external formatItalic: string = "default";
[@bs.module "../icons/format_underlined"]
external formatUnderlined: string = "default";
[@bs.module "../icons/format_list_bulleted"]
external formatListBulleted: string = "default";
[@bs.module "../icons/format_list_numbered"]
external formatListNumbered: string = "default";
[@bs.module "../icons/looks_one"] external looksOne: string = "default";
[@bs.module "../icons/looks_two"] external looksTwo: string = "default";
[@bs.module "../icons/lock"] external lock: string = "default";
[@bs.module "../icons/unlock"] external unlock: string = "default";
[@bs.module "../icons/expense-outline"]
[@bs.module "../icons/send-outline"]
external sendOutline: string = "default";

[@bs.module "../icons/dollar-sign"] external dollarSign: string = "default";
let xmlFromIcon = icon =>
  switch (icon) {
  | "email" => Some(email)
  | "email-outline" => Some(emailOutline)
  | "eye" => Some(eye)
  | "eye-outline" => Some(eyeOutline)
  | "eye-invisible" => Some(eyeInvisible)
  | "eye-invisible-outline" => Some(eyeInvisibleOutline)
  | "ok-circle" => Some(okCircle)
  | "calendar" => Some(calendar)
  | "calendar-outline" => Some(calendarOutline)
  | "clock-circle-outline" => Some(clockCircleOutline)
  | "comment-outline" => Some(commentOutline)
  | "cancel-outline" => Some(cancelOutline)
  | "plus-circle-outline" => Some(plusCircleOutline)
  | "plus-outline" => Some(plusOutline)
  | "piggy-bank-outline" => Some(piggyBankOutline)
  | "target-outline" => Some(targetOutline)
  | "single-right-outline" => Some(singleRightOutline)
  | "single-left-outline" => Some(singleLeftOutline)
  | "more-vertical" => Some(moreVertical)
  | "phone-outline" => Some(phoneOutline)
  | "face-id" => Some(faceId)
  | "arrow-down" => Some(arrowDown)
  | "arrow-up" => Some(arrowUp)
  | "camera-outline" => Some(cameraOutline)
  | "paperclip" => Some(paperclip)
  | "image-outline" => Some(imageOutline)
  | "file-outline" => Some(fileOutline)
  | "warning-circle-outline" => Some(warningCircleOutline)
  | "warning-circle" => Some(warningCircle)
  | "radio-active" => Some(radioActive)
  | "radio-inactive" => Some(radioInactive)
  | "format_bold" => Some(formatBold)
  | "format_italic" => Some(formatItalic)
  | "format_underlined" => Some(formatUnderlined)
  | "format_list_numbered" => Some(formatListNumbered)
  | "format_list_bulleted" => Some(formatListBulleted)
  | "looks_one" => Some(looksOne)
  | "looks_two" => Some(looksTwo)
  | "plus-circle" => Some(plusCircle)
  | "cancel-circle" => Some(cancelCircle)
  | "cancel-circle-outline" => Some(cancelCircleOutline)
  | "ok-circle-outline" => Some(okCircleOutline)
  | "folder" => Some(folder)
  | "folder-outline" => Some(folderOutline)
  | "stopwatch" => Some(stopwatch)
  | "stopwatch-outline" => Some(stopwatchOutline)
  | "globe" => Some(globe)
  | "globe-outline" => Some(globeOutline)
  | "suitcase" => Some(suitcase)
  | "suitcase-outline" => Some(suitcaseOutline)
  | "level" => Some(level)
  | "level-outline" => Some(levelOutline)
  | "user" => Some(user)
  | "user-outline" => Some(userOutline)
  | "multiple-stars" => Some(multipleStars)
  | "multiple-users" => Some(multipleUsers)
  | "remove-circle" => Some(removeCircle)
  | "remove-circle-outline" => Some(removeCircleOutline)
  | "bell-outline" => Some(bellOutline)
  | "health-bag-outline" => Some(healthBagOutline)
  | "plane-outline" => Some(planeOutline)
  | "recognition-medal-outline" => Some(recognitionMedalOutline)
  | "talk-outline" => Some(talkOutline)
  | "speaker-outline" => Some(speakerOutline)
  | "home-outline" => Some(homeOutline)
  | "more-horizontal" => Some(moreHorizontal)
  | "cog-outline" => Some(cogOutline)
  | "search-outline" => Some(searchOutline)
  | "speaker" => Some(speaker)
  | "raising-hands" => Some(raisingHands)
  | "certificate" => Some(certificate)
  | "recognition-medal" => Some(recognitionMedal)
  | "birthday-cake" => Some(birthdayCake)
  | "remove" => Some(remove)
  | "add" => Some(add)
  | "checkmark" => Some(checkmark)
  | "coins-outline" => Some(coinsOutline)
  | "number" => Some(number)
  | "percentage" => Some(percentage)
  | "lock" => Some(lock)
  | "unlock" => Some(unlock)
  | "expense-outline" => Some(expenseOutline)
  | "dollar-sign" => Some(dollarSign)
  | "send-outline" => Some(sendOutline)
  | _ => None
  };

let emptyStyle = ReactNative.Style.style();

[@genType]
[@react.component]
let make =
    (
      ~icon,
      ~size=24.0,
      ~color=?,
      ~wrapperStyle=emptyStyle,
      ~theme=Hero_Theme.default,
      ~testID=?,
    ) => {
  let iconColor =
    color->Belt.Option.getWithDefault @@ getColorProperty @@  theme##icon##icon;

  switch (xmlFromIcon(icon)) {
  | None => ReasonReact.null
  | Some(xml) =>
    <View
      ?testID
      style={StyleSheet.flatten([|
        Style.(
          style(
            ~display=`flex,
            ~alignItems=`center,
            ~justifyContent=`center,
            ~width=size->dp,
            ~height=size->dp,
            (),
          )
        ),
        wrapperStyle,
      |])}>
      <SvgXml
        xml
        override={
          "width": size,
          "height": size,
          "stroke": iconColor,
          "fill": iconColor,
        }
      />
    </View>
  };
};

[@genType]
let default = Helpers.injectTheme(make);
