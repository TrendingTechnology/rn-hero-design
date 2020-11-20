open ReactNative;
open React;
open Hero_Variables;
open Button;

let _PRIMARY_COLOR = Hero_Variables._DARK_PRIMARY_COLOR;
let _TEXT_COLOR = Hero_Variables._WHITE;
let _DISABLED_TEXT_COLOR = Hero_Variables._DISABLED_BACKGROUND_COLOR;
module MyButton = Button;

module Icon = {
  [@react.component]
  let make = (~icon, ~onPress, ~disabled=false) => {
    <ReactNative.TouchableOpacity
      onPress
      disabled
      style={Style.style(
        ~padding=Style.dp(4.0),
        ~paddingHorizontal=Style.dp(10.0),
        ~alignItems=`center,
        ~justifyContent=`center,
        (),
      )}>
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
      style={StyleSheet.flatten([|
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
      <Button onPress=onPressOpenByBrowser title="Open Browser" />
    </ReactNative.View>;
  };
};

module HeaderBar = {
  [@react.component]
  let make = (~title, ~onPressCancel, ~onPressReload) => {
    <ReactNative.View
      style={StyleSheet.flatten([|
        Style.style(
          ~height=44.0->Style.dp,
          ~flexDirection=`row,
          ~justifyContent=`spaceBetween,
          ~backgroundColor=_PRIMARY_COLOR,
          ~paddingHorizontal=Style.dp(10.0),
          (),
        ),
      |])}>
      <Button.default onPress=onPressCancel title="Cancel" color=_TEXT_COLOR style= />
      <ReactNative.View
        style={Style.style(~flex=1.0, ~justifyContent=`center, ())}>
        <Text
          style={Style.style(
            ~fontSize=_HEADER_5,
            ~textAlign=`center,
            ~color=_TEXT_COLOR,
            (),
          )}>
          title->React.string
        </Text>
      </ReactNative.View>
      <Icon icon="restart-outline" onPress=onPressReload />
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
        Share.share(ReactNative.Share.content(~url, ()));
        ();
      };

      ();
    });

  let _onPressOpenByBrowser =
    React.useCallback(_ => {
      switch (onPressShare) {
      | Some((callback: string => unit)) => callback(url)
      | None =>
        Linking.openURL(url);
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
    style={StyleSheet.flatten([|
      Style.style(~backgroundColor=_PRIMARY_COLOR, ()),
      style,
    |])}>
    {showHeader
       ? <HeaderBar title onPressCancel=_onPressCancel onPressReload />
       : <View />}
    <RNWebView
      ref=webview
      originWhitelist
      source
      onMessage
      style={StyleSheet.flatten([|Style.style(~flex=1.0, ())|])}
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
       : <View />}
  </RNSafeAreaView>;
};

let default = Helpers.injectTheme(make);
