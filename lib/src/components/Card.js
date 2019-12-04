import React from 'react';
import t from 'prop-types';
import { View, StyleSheet } from 'react-native';
import injectTheme from '../helpers/injectTheme';

const Card = ({ children, style, theme }) => (
  <View style={StyleSheet.flatten([theme.card.card, style])}>{children}</View>
);

Card.propTypes = {
  children: t.oneOfType([t.element, t.arrayOf(t.element)]),
  style: t.object,
  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object,
};

export default injectTheme(Card);
