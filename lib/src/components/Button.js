import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import t from 'prop-types';
import heroTheme from '../themes/hero';

const Button = ({
  text,
  onPress,
  disabled = false,
  loading = false,
  icon,
  rightIcon,
  style,
  theme = heroTheme,
}) => {
  const Wrapper = loading || disabled ? View : TouchableOpacity;
  return (
    <Wrapper
      onPress={onPress}
      style={StyleSheet.flatten([
        theme.button.wrapper,
        loading ? theme.button.loading : null,
        disabled ? theme.button.disabled : null,
        style,
      ])}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={theme.button.text}>{text}</Text>
      )}
    </Wrapper>
  );
};

Button.propTypes = {
  /**
   * The text displayed inside button
   */
  text: t.string.isRequired,
  onPress: t.func.isRequired,
  disabled: t.bool,
  loading: t.bool,
  style: t.object,
  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object,
};

export default Button;
