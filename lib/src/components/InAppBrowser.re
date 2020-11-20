open ReactNative;
open React;
open Hero_Variables;

let _PRIMARY_COLOR = Hero_Variables._DARK_PRIMARY_COLOR;
let _TEXT_COLOR = Hero_Variables._WHITE;

module BottomBar = {
  [@react.component]
  let make =
      (
        ~canGoBack,
        ~canGoForward,
        ~onPressBack,
        ~onPressGoForward,
        ~onPressShare,
      ) => {
    <ReactNative.View
      style={StyleSheet.flatten([|
        Style.style(
          ~height=44.0->Style.dp,
          ~flexDirection=`row,
          ~justifyContent=`spaceBetween,
          (),
        ),
      |])}>
      <Button onPress=onPressBack title="Back" disabled={!canGoBack} />
      <Button onPress=onPressGoForward title="Next" disabled={!canGoForward} />
      <Button onPress=onPressShare title="Share" />
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
          (),
        ),
      |])}>
      <Button onPress=onPressCancel title="Cancel" />
      <ReactNative.View
        style={Style.style(~flex=1.0, ~justifyContent=`center, ())}>
        <Text
          style={Style.style(
            ~fontSize=_HEADER_4,
            ~textAlign=`center,
            ~color=_TEXT_COLOR,
            (),
          )}>
          title->React.string
        </Text>
      </ReactNative.View>
      <Button onPress=onPressReload title="reload" />
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
         />
       : <View />}
  </RNSafeAreaView>;
};

let default = Helpers.injectTheme(make);
