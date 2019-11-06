import React from 'react';
import t from 'prop-types';
import { Text as RNText, StyleSheet } from 'react-native';
import heroTheme from '../themes/hero';

const Text = ({ children, size, weight, color, style, theme = heroTheme }) => (
  <RNText
    style={StyleSheet.flatten([
      theme.text.text,
      theme.text[size],
      { fontWeight: weight, color },
      style,
    ])}
  >
    {children}
  </RNText>
);

Text.propTypes = {
  children: t.string,
  size: t.oneOf(['h1', 'h2', 'h3', 'h4', 'h5']),
  weight: t.oneOf(['300', '400', '500', '600', '700']),
  color: t.string,
  style: t.object,
  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object,
};

export default Text;
