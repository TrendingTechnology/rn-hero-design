import React from 'react';
import t from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  StyleSheet,
} from 'react-native';
import hasHomeBar from '../helpers/hasHomeBar';
import injectTheme from '../helpers/injectTheme';

class BottomButton extends React.Component {
  state = {
    showKeyboard: false,
  };

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this.handleKeyboardWillShow,
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this.handleKeyboardWillHide,
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  handleKeyboardWillShow = () => this.setState({ showKeyboard: true });
  handleKeyboardWillHide = () => this.setState({ showKeyboard: false });

  render() {
    const {
      text,
      onPress,
      disabled = false,
      loading = false,
      forceInset,
      wrapperStyle,
      buttonStyle,
      textStyle,
      theme,
    } = this.props;
    const { showKeyboard } = this.state;
    const Wrapper = loading || disabled ? View : TouchableOpacity;

    let themeWrapperStyle;

    if (forceInset === 'always') {
      themeWrapperStyle = theme.bottomButton.wrapperWithHomeBar;
    } else if (forceInset === 'never') {
      themeWrapperStyle = theme.bottomButton.wrapperWithoutHomeBar;
    } else {
      themeWrapperStyle =
        !showKeyboard && hasHomeBar()
          ? theme.bottomButton.wrapperWithHomeBar
          : theme.bottomButton.wrapperWithoutHomeBar;
    }

    return (
      <Wrapper
        onPress={onPress}
        style={StyleSheet.flatten([
          theme.bottomButton.wrapper,
          themeWrapperStyle,
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
  }
}

BottomButton.propTypes = {
  text: t.string.isRequired,
  onPress: t.func.isRequired,
  disabled: t.bool,
  loading: t.bool,
  forceInset: t.oneOf(['always', 'never']),
  wrapperStyle: t.object,
  buttonStyle: t.object,
  textStyle: t.object,
  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object,
};

export default injectTheme(BottomButton);
