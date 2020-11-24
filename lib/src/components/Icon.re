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

[@bs.module "../icons/format_bold"] external formatBold: string = "default";
[@bs.module "../icons/format_italic"]
external formatItalic: string = "default";
[@bs.module "../icons/format_underlined"]
external formatUnderlined: string = "default";
[@bs.module "../icons/format_list_bulleted"]
external formatListBulleted: string = "default";
[@bs.module "../icons/format_list_numbered"]
external formatListNumbered: string = "default";

[@bs.module "../icons/share-1.js"] external share1: string = "default";
[@bs.module "../icons/share-2.js"] external share2: string = "default";
[@bs.module "../icons/browser-outline.js"]
external browserOutline: string = "default";
[@bs.module "../icons/restart-outline"]
external restartOutline: string = "default";

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
  | "share-1" => Some(share1)
  | "share-2" => Some(share2)
  | "restart-outline" => Some(restartOutline)
  | "browser-outline" => Some(browserOutline)
  | _ => None
  };

let emptyStyle = ReactNative.Style.style();

[@react.component]
let make =
    (
      ~icon,
      ~size=24.0,
      ~color=?,
      ~wrapperStyle=emptyStyle,
      ~theme=Hero_Theme.default,
    ) => {
  let iconColor =
    color->Belt.Option.getWithDefault @@ getColorProperty @@  theme##icon##icon;

  switch (xmlFromIcon(icon)) {
  | None => ReasonReact.null
  | Some(xml) =>
    <View
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

let default = Helpers.injectTheme(make);
