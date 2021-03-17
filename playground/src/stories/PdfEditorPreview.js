import React from 'react';
import { PdfEditorPreview, test } from 'rn-hero-design';
import { WebView } from 'react-native-webview';
const RNFS = require('react-native-fs');

const PdfEditorPreviewScreen = () => {
  const [htmlPath, setHtmlPath] = React.useState(null);
  const path = RNFS.DocumentDirectoryPath + '/test.html';

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
    <style>
      body {
        margin: 0;
      }
    </style>
  </head>
  <body>
      <h1 id="h1">Hello from webview NANI</h1>
    <script src="http://localhost:3000/log.js"></script>
          <div id="root"></div>
          <script>
            ${test}
          </script>
</html>
    `;

  RNFS.writeFile(path, html, 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN!');
      setHtmlPath(path);
    })
    .catch((err) => {
      console.log(err.message);
    });

  if (!htmlPath) return null;

  return (
    <>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        allowFileAccess
      />
    </>
  );
};

export default PdfEditorPreviewScreen;
// import React from 'react';
// import { PdfEditorPreview } from 'rn-hero-design';
// import { Text } from 'react-native';
// const RNFS = require('react-native-fs');
// import { WebView } from 'react-native-webview';

// const PdfEditorPreviewScreen = ({ theme }) => {
//   // console.log(RNFS.MainBundlePath);
//   // console.log(RNFS.DocumentDirectoryPath);
//   // RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
//   //   .then((result) => {
//   //     // console.log('GOT RESULT', result);
//   //     console.log(result.map((r) => r.path));

//   //     // stat the first file
//   //     return Promise.all([RNFS.stat(result[0].path), result[0].path]);
//   //   })
//   //   .then((statResult) => {
//   //     if (statResult[0].isFile()) {
//   //       // if we have a file, read it
//   //       return RNFS.readFile(statResult[1], 'utf8');
//   //     }

//   //     return 'no file';
//   //   })
//   //   .then((contents) => {
//   //     // log the file contents
//   //     console.log(contents);
//   //   })
//   //   .catch((err) => {
//   //     console.log(err.message, err.code);
//   //   });

//   const [htmlPath, setHtmlPath] = React.useState(null);

//   const path = RNFS.DocumentDirectoryPath + '/test.html';

//   const html = `
// <!DOCTYPE html>
// <html>
//   <head>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
//     <style>
//       body {
//         margin: 0;
//       }
//     </style>
//   </head>
//   <body>
//     <div id="root">
//       <h1 id="h1">Hello from webview</h1>
//     </div>
//     <script src="http://localhost:3000/log.js"></script>
// </html>
//     `;

//   RNFS.writeFile(path, html, 'utf8')
//     .then((success) => {
//       console.log('FILE WRITTEN!');
//       setHtmlPath(path);
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });

//   if (!htmlPath) return null;

//   console.log(htmlPath);

//   return (
//     <>
//       <Text>Hello</Text>
//       <WebView originWhitelist={['*']} source={{ html: html }} />
//     </>
//   );
// };

// export default PdfEditorPreviewScreen;
