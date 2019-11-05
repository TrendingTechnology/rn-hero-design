import React from 'react';
import { View, Text, TextInput as RNTextInput, StyleSheet } from 'react-native';
import Icon from './Icon';
import heroTheme from '../themes/hero';

class TextInput extends React.Component {
  state = {
    focused: false,
  };

  handleFocus = () => this.setState({ focused: true });

  handleBlur = () => this.setState({ focused: false });

  render() {
    const { focused } = this.state;
    const {
      label,
      value,
      onChange,
      rightIcon,
      disabled,
      error,
      autoFocus,
      secureTextEntry,
      wrapperStyle,
      inputStyle,
      theme = heroTheme,
    } = this.props;

    return (
      <View style={StyleSheet.flatten([theme.textInput.wrapper, wrapperStyle])}>
        <Text
          style={StyleSheet.flatten([
            theme.textInput.label,
            error ? theme.textInput.errorLabel : null,
          ])}
        >
          {focused || value ? label : ''}
        </Text>
        <View
          style={StyleSheet.flatten([
            theme.textInput.textInput,
            error ? theme.textInput.errorTextInput : null,
            inputStyle,
          ])}
        >
          <RNTextInput
            placeholder={focused ? '' : label}
            value={value}
            onTextChange={onChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            editable={!disabled}
            autoFocus={autoFocus}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={
              disabled
                ? theme.textInput.disabledBaseTextInput.color
                : theme.textInput.baseTextInput.color
            }
            style={StyleSheet.flatten([
              theme.textInput.baseTextInput,
              disabled ? theme.textInput.disabledBaseTextInput : null,
            ])}
          />
          <Icon
            icon={rightIcon}
            color={
              error
                ? theme.textInput.errorIcon.color
                : theme.textInput.icon.color
            }
          />
        </View>
        <Text style={theme.textInput.errorMessage}>{error}</Text>
      </View>
    );
  }
}

export default TextInput;
