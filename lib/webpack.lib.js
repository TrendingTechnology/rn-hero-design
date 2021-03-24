const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

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
                    'PdfEditor__App.bundle.js',
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
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
};
