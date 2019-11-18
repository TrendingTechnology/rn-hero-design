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
import heroTheme from '../themes/hero';
import hasHomeBar from '../helpers/hasHomeBar';

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
      forceInset = false,
      wrapperStyle,
      buttonStyle,
      textStyle,
      theme = heroTheme,
    } = this.props;
    const { showKeyboard } = this.state;
    const Wrapper = loading || disabled ? View : TouchableOpacity;

    return (
      <Wrapper
        onPress={onPress}
        style={StyleSheet.flatten([
          theme.bottomButton.wrapper,
          forceInset || (!showKeyboard && hasHomeBar())
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
  }
}

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
