import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';

const TextInput = ({ placeholder, value, onChange }) => (
  <RNTextInput
    placeholder={placeholder}
    value={value}
    onTextChange={onChange}
    style={styles.textInput}
  />
);

const styles = StyleSheet.create({
  textInput: {
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    borderRadius: 4,
  },
});

export default TextInput;
