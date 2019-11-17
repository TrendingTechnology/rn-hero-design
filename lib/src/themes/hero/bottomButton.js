import { StyleSheet } from 'react-native';
import { getInset } from 'react-native-safe-area-view';
import {
  HEADER_4,
  MEDIUM_SIZE,
  PRIMARY_COLOR,
  INVERTED_TEXT_COLOR,
  DISABLED_BACKGROUND_COLOR as GLOBAL_DISABLED_BACKGROUND_COLOR,
} from './variables';

const TEXT_FONT_SIZE = HEADER_4;
const WRAPPER_PADDING_VERTICAL = MEDIUM_SIZE;
const WRAPPER_PADDING_HORIZONTAL = MEDIUM_SIZE;
const WRAPPER_HEIGHT = TEXT_FONT_SIZE + WRAPPER_PADDING_VERTICAL * 2;
const WRAPPER_BORDER_RADIUS = WRAPPER_HEIGHT * 0.5;
const FILLED_TEXT_COLOR = INVERTED_TEXT_COLOR;
const FILLED_BACKGROUND_COLOR = PRIMARY_COLOR;
const OUTLINED_TEXT_COLOR = PRIMARY_COLOR;
const OUTLINED_BORDER_COLOR = PRIMARY_COLOR;
const DISABLED_TEXT_COLOR = INVERTED_TEXT_COLOR;
const DISABLED_BACKGROUND_COLOR = GLOBAL_DISABLED_BACKGROUND_COLOR;

const bottomInset = getInset('bottom');

const styles = {
  wrapper: {
    marginHorizontal: 16,
  },
  wrapperWithoutHomeBar: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  wrapperWithHomeBar: {
    marginBottom: 0,
    paddingBottom: bottomInset,
  },
  // wrapperWithoutHomeBar: {
  //   marginBottom: 16,
  //   paddingBottom: 0,
  // },
  // wrapperWithHomeBar: {
  //   marginBottom: bottomInset,
  //   paddingBottom: 0,
  // },
};

export default StyleSheet.create(styles);
