module RN = ReactNative;
module Style = RN.Style;
open React;
open Hero_Variables;

let _PRIMARY_COLOR = Hero_Variables._DARK_PRIMARY_COLOR;
let _TEXT_COLOR = Hero_Variables._WHITE;
let _DISABLED_TEXT_COLOR = Hero_Variables._DISABLED_BACKGROUND_COLOR;

module Icon = {
  [@react.component]
  let make = (~icon, ~onPress, ~disabled=false, ~style: Style.t=Style.style()) => {
    <ReactNative.TouchableOpacity
      onPress
      disabled
      style={RN.StyleSheet.flatten([|
        Style.style(
          ~padding=Style.dp(4.0),
          ~paddingHorizontal=Style.dp(10.0),
          ~alignItems=`center,
          ~justifyContent=`center,
          (),
        ),
        style,
      |])}>
      <Icon
        key=icon
        icon
        size=20.0
        color={disabled ? _GREY_3 : _WHITE}
        wrapperStyle={Style.style(~opacity=disabled ? 0.5 : 1.0, ())}
      />
    </ReactNative.TouchableOpacity>;
  };
};

module BottomBar = {
  [@react.component]
  let make =
      (
        ~canGoBack,
        ~canGoForward,
        ~onPressBack,
        ~onPressGoForward,
        ~onPressShare,
        ~onPressOpenByBrowser,
      ) => {
    <ReactNative.View
      style={RN.StyleSheet.flatten([|
        Style.style(
          ~height=44.0->Style.dp,
          ~flexDirection=`row,
          ~justifyContent=`spaceBetween,
          ~paddingHorizontal=Style.dp(10.0),
          (),
        ),
      |])}>
      <Icon
        icon="single-left-outline"
        onPress=onPressBack
        disabled={!canGoBack}
      />
      <Icon
        icon="single-right-outline"
        onPress=onPressGoForward
        disabled={!canGoForward}
      />
      <Icon icon="share-1" onPress=onPressShare />
      <Icon icon="browser-outline" onPress=onPressOpenByBrowser />
    </ReactNative.View>;
  };
};

module HeaderBar = {
  [@react.component]
  let make = (~title, ~onPressCancel, ~onPressReload) => {
    <ReactNative.View
      style={RN.StyleSheet.flatten([|
        Style.style(
          ~height=44.0->Style.dp,
          ~flexDirection=`row,
          ~justifyContent=`spaceBetween,
          ~backgroundColor=_PRIMARY_COLOR,
          ~paddingHorizontal=Style.dp(10.0),
          (),
        ),
      |])}>
      <ReactNative.TouchableOpacity
        onPress=onPressCancel
        style={Style.style(
          ~padding=Style.dp(4.0),
          ~paddingHorizontal=Style.dp(10.0),
          ~alignItems=`center,
          ~justifyContent=`center,
          ~width=80.0->Style.dp,
          (),
        )}>
        <Text size="h4" color=_WHITE> "Cancel" </Text>
      </ReactNative.TouchableOpacity>
      <ReactNative.View
        style={Style.style(
          ~flex=1.0,
          ~justifyContent=`center,
          ~backgroundColor=_PRIMARY_COLOR,
          (),
        )}>
        <Text
          size="h4"
          style={Style.style(~textAlign=`center, ~color=_TEXT_COLOR, ())}>
          title
        </Text>
      </ReactNative.View>
      <ReactNative.View
        style={Style.style(
          ~width=80.0->Style.dp,
          ~flexDirection=`rowReverse,
          (),
        )}>
        <Icon icon="restart-outline" onPress=onPressReload />
      </ReactNative.View>
    </ReactNative.View>;
  };
};

[@react.component]
let make =
    (
      ~onPressShare: option(string => unit)=?,
      ~showToolbar: bool=true,
      ~showHeader: bool=true,
      ~originWhitelist,
      ~source,
      ~onMessage,
      ~style,
      ~onNavigationStateChange=?,
      ~onPressCancel=?,
      ~theme=Hero_Theme.default,
    ) => {
  let webview = React.useRef(Js.Null.empty);

  let onPressBack =
    React.useCallback(_ => {
      switch (Js.Null.toOption(webview.current)) {
      | Some(e) => RNWebView.goBack(e)
      | _ => ()
      }
    });
  let onPressGoForward =
    React.useCallback(_ => {
      switch (Js.Null.toOption(webview.current)) {
      | Some(e) => RNWebView.goForward(e)
      | _ => ()
      }
    });

  let onPressReload =
    React.useCallback(_ => {
      switch (Js.Null.toOption(webview.current)) {
      | Some(e) => RNWebView.reload(e)
      | _ => ()
      }
    });

  let _onPressCancel =
    React.useCallback(_ => {
      switch (onPressCancel) {
      | Some(callback) => callback()
      | None => ()
      };
      ();
    });

  let (canGoBack, setCanGoBack) = React.useState(_ => false);
  let (canGoForward, setCanGoForward) = React.useState(_ => false);
  let (url, setUrl) = React.useState(_ => "");
  let (title, setTitle) = React.useState(_ => "");

  let _onPressShare =
    React.useCallback(_ => {
      switch (onPressShare) {
      | Some((callback: string => unit)) => callback(url)
      | None =>
        RN.Share.share(ReactNative.Share.content(~url, ()));
        ();
      };

      ();
    });

  let _onPressOpenByBrowser =
    React.useCallback(_ => {
      switch (onPressShare) {
      | Some((callback: string => unit)) => callback(url)
      | None =>
        RN.Linking.openURL(url);
        ();
      };

      ();
    });
  let _onNavigationStateChange =
    React.useCallback(navigation => {
      setCanGoBack(_ => navigation##canGoBack);
      setCanGoForward(_ => navigation##canGoForward);
      setUrl(_ => navigation##url);
      setTitle(_ => navigation##title);
      switch (onNavigationStateChange) {
      | Some(callback) => callback(navigation)
      | None => ()
      };

      ();
    });

  <RNSafeAreaView
    forceInset={"bottom": "always"}
    style={RN.StyleSheet.flatten([|
      Style.style(~backgroundColor=_PRIMARY_COLOR, ()),
      style,
    |])}>
    {showHeader
       ? <HeaderBar title onPressCancel=_onPressCancel onPressReload />
       : <RN.View />}
    <RNWebView
      ref=webview
      originWhitelist
      source
      onMessage
      style={RN.StyleSheet.flatten([|Style.style(~flex=1.0, ())|])}
      onNavigationStateChange=_onNavigationStateChange
    />
    {showToolbar
       ? <BottomBar
           canGoBack
           canGoForward
           onPressBack
           onPressGoForward
           onPressShare=_onPressShare
           onPressOpenByBrowser=_onPressOpenByBrowser
         />
       : <RN.View />}
  </RNSafeAreaView>;
};

let default = Helpers.injectTheme(make);
