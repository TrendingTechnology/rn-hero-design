import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
} from 'react-native';
import { Header } from 'react-navigation-stack';
import { getInset } from 'react-native-safe-area-view';
import { isIOS } from '../helpers/platform';

const KeyboardAvoidingView = ({ withNavigation, children, style }) => {
  let verticalOffset = 0;

  if (withNavigation) {
    const { width, height } = Dimensions.get('window');
    const isLandscape = width > height;
    const topInset = getInset('top', isLandscape);
    const iOSStatusBarHeight = 20;

    /*
     * If IPX+: topInset = 44, statusBar = 20
     * If IP8-: topInset = 20, statusBar = 20
     */
    verticalOffset = isIOS
      ? Header.HEIGHT + topInset - iOSStatusBarHeight
      : Header.HEIGHT + topInset;
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
