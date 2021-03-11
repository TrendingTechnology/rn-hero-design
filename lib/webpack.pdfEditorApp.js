const path = require('path');

module.exports = {
  // mode: 'production',
  mode: 'development',
  entry: './src/components/PdfEditor__App.bs',
  output: {
    filename: 'pdfEditorApp.js',
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
};
