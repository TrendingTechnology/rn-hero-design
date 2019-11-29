import React from 'react';
import t from 'prop-types';
import { View, StyleSheet } from 'react-native';
import injectTheme from '../helpers/injectTheme';

const Container = ({
  children,
  fluid = false,
  direction = 'column',
  style,
  theme,
}) => (
  <View
    style={StyleSheet.flatten([
      theme.container.container,
      fluid ? theme.container.fluid : null,
      { flexDirection: direction },
      style,
    ])}
  >
    {children}
  </View>
);

Container.propTypes = {
  children: t.oneOfType([t.element, t.arrayOf(t.element)]),
  fluid: t.bool,
  direction: t.oneOf(['column', 'row']),
  style: t.object,
  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object,
};

export default injectTheme(Container);
