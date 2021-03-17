open PdfEditor.Types;

[@bs.module "./pdfEditorApp"] external pdfEditorApp: string = "default";

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
          <meta name="viewport" content="width=656">
          <style>
            body {
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
    allowUniversalAccessFromFileURLs=true
    onMessage
  />;
};

let default = make;
