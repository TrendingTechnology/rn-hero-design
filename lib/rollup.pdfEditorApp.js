import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

export default {
  input: 'src/components/PdfEditor__App.bs',
  output: {
    file: 'src/components/pdfEditorApp.js',
    format: 'iife',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    resolve({
      browser: true,
    }),
    commonjs({
      include: [/node_modules/],
      namedExports: {
        react: ['createElement', 'Component'],
        'react-dom': ['render', 'createRoot', 'hydrate'],
      },
    }),
    babel({
      babelrc: false,
      presets: ['@babel/preset-react', '@babel/preset-flow'],
      plugins: ['@babel/plugin-proposal-class-properties'],
    }),
  ],
};
