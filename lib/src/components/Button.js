import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { PRIMARY_COLOR } from '../themes/hero';

const Button = ({
  text,
  onPress,
  disabled,
  loading,
  icon,
  rightIcon,
  style
}) => {
  const Wrapper = loading || disabled ? View : TouchableOpacity;
  return (
    <Wrapper
      onPress={onPress}
      style={StyleSheet.flatten([
        styles.button,
        loading ? styles.buttonLoading : null,
        disabled ? styles.buttonDisabled : null,
        style
      ])}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </Wrapper>
  );
};

const noop = () => {};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 24
  },
  buttonLoading: {
    opacity: 0.6
  },
  buttonDisabled: {
    backgroundColor: 'lightgrey'
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 16,
    color: 'white'
  }
});

export default Button;
