const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  // mode: 'development',
  entry: './src/components/PdfEditor__App.bs',
  output: {
    filename: 'PdfEditor__App.bundle.js',
    path: path.resolve(__dirname, 'src/components'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 1048576,
        },
      },
      {
        test: /\.svg$/i,
        loader: 'svg-inline-loader',
      },
    ],
  },
  resolve: {
    alias: {
      '^pdfjs-dist$': path.resolve(
        './node_modules/pdfjs-dist/es5/build/pdf.js',
      ),
    },
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     templateContent: `
  //       <!DOCTYPE html>
  //       <html>
  //         <head>
  //           <meta charset="utf-8">
  //           <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
  //           <style>
  //             body {
  //               margin: 0;
  //             }
  //           </style>
  //         </head>
  //         <body>
  //           <div id="root"></div>
  //         </body>
  //       </html>
  //     `,
  //   }),
  // ],
};
