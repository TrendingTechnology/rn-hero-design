const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'lib.js',
    path: path.resolve(__dirname),
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules\/(?!react-native-safe-area-view).*/,
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
    ],
  },
  externals: /^(prop-types|react|react-redux|react-native|react-native-svg|react-native-webview|@react-native-community\/datetimepicker)$/i,
};
