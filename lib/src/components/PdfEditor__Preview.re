open PdfEditor.Types;

[@bs.module "./test"] external pdfEditorApp: string = "default";

type editorProps = {
  file: string,
  variableValues: Js.Json.t,
};

[@react.component]
let make = () => {
  let html =
    React.useMemo0(() => {
      {j|
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
          <script src="http://localhost:3000/log.js" onerror="console.log('error!!')"></script>
          <style>
            body {
              background-color: red;
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script>
            $pdfEditorApp
          </script>
        </body>
      </html>
      |j}
    });

  let onMessage = event => ();

  <RNWebView
    originWhitelist=[|"*"|]
    source={RNWebView.Source.html(~html, ())}
    scrollEnabled=true
    hideKeyboardAccessoryView=true
    keyboardDisplayRequiresUserAction=false
    allowUniversalAccessFromFileURLs=true
    onMessage
  />;
};

let default = make;
