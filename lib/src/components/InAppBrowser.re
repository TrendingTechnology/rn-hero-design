open ReactNative;
open React;
open Hero_Variables;

let _PRIMARY_COLOR = Hero_Variables._DARK_PRIMARY_COLOR;
let _TEXT_COLOR = Hero_Variables._WHITE;
[@react.component]
let make =
    (
      ~showToolbar: bool=true,
      ~originWhitelist,
      ~source,
      ~onMessage,
      ~style,
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

  let onPressShare = React.useCallback(_ => {()});

  let (canGoBack, setCanGoBack) = React.useState(_ => false);
  let (canGoForward, setCanGoForward) = React.useState(_ => false);
  let (url, setUrl) = React.useState(_ => "");
  let (title, setTitle) = React.useState(_ => "");

  let onNavigationStateChange =
    React.useCallback(navigation => {
      setCanGoBack(_ => navigation##canGoBack);
      setCanGoForward(_ => navigation##canGoForward);
      setUrl(_ => navigation##url);
      setTitle(_ => navigation##title);
      ();
    });

  <RNSafeAreaView
    forceInset={"bottom": "always"}
    style={StyleSheet.flatten([|
      Style.style(~backgroundColor=_PRIMARY_COLOR, ()),
      style,
    |])}>
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
      <Button onPress={e => ()} title="Cancel" />
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
    </ReactNative.View>
    <RNWebView
      ref=webview
      originWhitelist
      source
      onMessage
      style={StyleSheet.flatten([|Style.style(~flex=1.0, ())|])}
      onNavigationStateChange
    />
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
    </ReactNative.View>
  </RNSafeAreaView>;
};

let default = Helpers.injectTheme(make);
