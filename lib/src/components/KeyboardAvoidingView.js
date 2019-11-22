import React from 'react';
import { KeyboardAvoidingView as RNKeyboardAvoidingView } from 'react-native';
import hasHomeBar from '../helpers/hasHomeBar';
import { isAndroid } from '../helpers/platform';

const KeyboardAvoidingView = ({ withNavigation, children, style }) => {
  let verticalOffset = 0;

  if (withNavigation) {
    verticalOffset = hasHomeBar() || isAndroid ? 88 : 64;
  }

  return (
    <RNKeyboardAvoidingView
      enabled
      behavior="padding"
      keyboardVerticalOffset={verticalOffset}
      style={style}
    >
      {children}
    </RNKeyboardAvoidingView>
  );
};

export default KeyboardAvoidingView;
