import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index',
  output: {
    file: 'lib.js',
    format: 'esm',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: ['@babel/preset-react', '@babel/preset-flow'],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        [
          'babel-plugin-inline-import',
          {
            extensions: ['.svg'],
          },
        ],
      ],
    }),
    commonjs(),
  ],
  external: [
    'prop-types',
    'react',
    'react-native',
    'react-native-svg',
    'react-redux',
    'react-native-webview'
  ],
};
