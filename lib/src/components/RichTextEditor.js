import React from 'react';
import { WebView } from 'react-native-webview';
import heroEditorApp from 'hero-editor/lib/dist/app.txt';

const html = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      * {
        font-family: sans-serif;
      }
    </style>
  </head>

  <body>
    <div id="root"></div>
    <script>
      ${heroEditorApp}
    </script>
  </body>
</html>
`;

const RichTextEditor = () => (
  <WebView originWhitelist={['*']} source={{ html }} />
);

export default RichTextEditor;
