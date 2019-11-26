import React from 'react';
import t from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import injectTheme from '../helpers/injectTheme';

const Button = ({
  text,
  onPress,
  disabled = false,
  loading = false,
  icon,
  rightIcon,
  variant = 'filled',
  wrapperStyle,
  textStyle,
  theme,
}) => {
  const Wrapper = loading || disabled ? View : TouchableOpacity;
  const styles = getStylesByVariant(variant, theme.button);

  return (
    <Wrapper
      onPress={onPress}
      style={StyleSheet.flatten([
        theme.button.wrapper,
        styles.wrapper,
        disabled ? theme.button.disabledWrapper : null,
        wrapperStyle,
      ])}
    >
      {loading && !disabled ? (
        <ActivityIndicator size="small" color={styles.loadingIndicator.color} />
      ) : (
        <Text
          style={StyleSheet.flatten([
            theme.button.text,
            styles.text,
            disabled ? theme.button.disabledText : null,
            textStyle,
          ])}
        >
          {text}
        </Text>
      )}
    </Wrapper>
  );
};

const getStylesByVariant = (variant, styles) => {
  const variantStyles = {
    filled: {
      wrapper: styles.filledWrapper,
      text: styles.filledText,
      loadingIndicator: styles.filledLoadingIndicator,
    },
    outlined: {
      wrapper: styles.outlinedWrapper,
      text: styles.outlinedText,
      loadingIndicator: styles.outlinedLoadingIndicator,
    },
  };
  return variantStyles[variant] || variantStyles.filled;
};

Button.propTypes = {
  /**
   * The text displayed inside button
   */
  text: t.string.isRequired,
  onPress: t.func.isRequired,
  disabled: t.bool,
  loading: t.bool,
  variant: t.oneOf(['filled', 'outlined']),
  wrapperStyle: t.object,
  textStyle: t.object,
  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object,
};

export default injectTheme(Button);
