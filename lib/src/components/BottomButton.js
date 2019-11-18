import React from 'react';
import t from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import heroTheme from '../themes/hero';
import hasHomeBar from '../helpers/hasHomeBar';

const BottomButton = ({
  text,
  onPress,
  disabled = false,
  loading = false,
  forceInset = false,
  wrapperStyle,
  buttonStyle,
  textStyle,
  theme = heroTheme,
}) => {
  const Wrapper = loading || disabled ? View : TouchableOpacity;

  return (
    <Wrapper
      onPress={onPress}
      style={StyleSheet.flatten([
        theme.bottomButton.wrapper,
        hasHomeBar() || forceInset
          ? theme.bottomButton.wrapperWithHomeBar
          : theme.bottomButton.wrapperWithoutHomeBar,
        disabled ? theme.bottomButton.disabledWrapper : null,
        wrapperStyle,
      ])}
    >
      <View
        style={StyleSheet.flatten([theme.bottomButton.button, buttonStyle])}
      >
        {loading && !disabled ? (
          <ActivityIndicator
            size="small"
            color={theme.bottomButton.loadingIndicator.color}
          />
        ) : (
          <Text
            style={StyleSheet.flatten([
              theme.bottomButton.text,
              disabled ? theme.bottomButton.disabledText : null,
              textStyle,
            ])}
          >
            {text}
          </Text>
        )}
      </View>
    </Wrapper>
  );
};

BottomButton.propTypes = {
  text: t.string.isRequired,
  onPress: t.func.isRequired,
  disabled: t.bool,
  loading: t.bool,
  forceInset: t.bool,
  wrapperStyle: t.object,
  buttonStyle: t.object,
  textStyle: t.object,
  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object,
};

export default BottomButton;
