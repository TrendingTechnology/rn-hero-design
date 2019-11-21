import React from 'react';
import { KeyboardAvoidingView as RNKeyboardAvoidingView } from 'react-native';
import hasHomeBar from '../helpers/hasHomeBar';
import { isAndroid } from '../helpers/platform';

const KeyboardAvoidingView = ({ children, style }) => (
  <RNKeyboardAvoidingView
    enabled
    behavior="padding"
    keyboardVerticalOffset={hasHomeBar() || isAndroid ? 88 : 64}
    style={style}
  >
    {children}
  </RNKeyboardAvoidingView>
);

export default KeyboardAvoidingView;
