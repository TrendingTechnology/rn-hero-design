import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
} from 'react-native';
import { getInset } from 'react-native-safe-area-view';
import { isIOS } from '../helpers/platform';

// https://github.com/react-navigation/react-navigation/blob/1.x/src/views/Header/Header.js
const APPBAR_HEIGHT = isIOS ? 44 : 56;
const STATUSBAR_HEIGHT = isIOS ? 20 : 0;
const HEADER_HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;

const KeyboardAvoidingView = ({ withNavigation, children, style }) => {
  let verticalOffset = 0;

  if (withNavigation) {
    const { width, height } = Dimensions.get('window');
    const isLandscape = width > height;
    const topInset = getInset('top', isLandscape);

    /*
     * If IPX+: topInset = 44, statusBar = 20
     * If IP8-: topInset = 20, statusBar = 20
     */
    verticalOffset = isIOS
      ? HEADER_HEIGHT + topInset - STATUSBAR_HEIGHT
      : HEADER_HEIGHT + topInset;
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
