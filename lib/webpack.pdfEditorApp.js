const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: 'production',
  mode: 'development',
  entry: './src/components/PdfEditor__Test',
  output: {
    filename: 'pdfEditorApp.js',
    path: path.resolve(__dirname, 'src/components'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-flow'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              [
                'babel-plugin-inline-import',
                {
                  extensions: [
                    '.svg',
                    'hero-editor/dist/app.js',
                    'pdfEditorApp',
                  ],
                },
              ],
            ],
          },
        },
      },
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
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
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
            <div id="root"></div>
          </body>
        </html>
      `,
    }),
  ],
};
