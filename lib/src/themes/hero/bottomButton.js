import { StyleSheet } from 'react-native';
import { getInset } from 'react-native-safe-area-view';
import {
  HEADER_4,
  MEDIUM_SIZE,
  PRIMARY_COLOR,
  INVERTED_TEXT_COLOR,
  DISABLED_BACKGROUND_COLOR as GLOBAL_DISABLED_BACKGROUND_COLOR,
} from './variables';

const bottomInset = getInset('bottom');

const WRAPPER_MARGIN_HORIZONTAL = MEDIUM_SIZE;
const WRAPPER_NO_HOME_BAR_MARGIN_BOTTOM = MEDIUM_SIZE;
const WRAPPER_NO_HOME_BAR_PADDING_BOTTOM = 0;
const WRAPPER_WITH_HOME_BAR_MARGIN_BOTTOM = bottomInset;
const WRAPPER_WITH_HOME_BAR_PADDING_BOTTOM = 0;
const TEXT_FONT_SIZE = HEADER_4;
const BUTTON_PADDING_VERTICAL = MEDIUM_SIZE;
const BUTTON_PADDING_HORIZONTAL = MEDIUM_SIZE;
const BUTTON_HEIGHT = TEXT_FONT_SIZE + BUTTON_PADDING_VERTICAL * 2;
const BUTTON_BORDER_RADIUS = BUTTON_HEIGHT * 0.5;
const FILLED_TEXT_COLOR = INVERTED_TEXT_COLOR;
const FILLED_BACKGROUND_COLOR = PRIMARY_COLOR;
const DISABLED_TEXT_COLOR = INVERTED_TEXT_COLOR;
const DISABLED_BACKGROUND_COLOR = GLOBAL_DISABLED_BACKGROUND_COLOR;

const styles = {
  wrapper: {
    marginHorizontal: WRAPPER_MARGIN_HORIZONTAL,
    backgroundColor: FILLED_BACKGROUND_COLOR,
    borderRadius: BUTTON_BORDER_RADIUS,
  },
  wrapperWithoutHomeBar: {
    marginBottom: WRAPPER_NO_HOME_BAR_MARGIN_BOTTOM,
    paddingBottom: WRAPPER_NO_HOME_BAR_PADDING_BOTTOM,
  },
  wrapperWithHomeBar: {
    marginBottom: WRAPPER_WITH_HOME_BAR_MARGIN_BOTTOM,
    paddingBottom: WRAPPER_WITH_HOME_BAR_PADDING_BOTTOM,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: BUTTON_HEIGHT,
    paddingHorizontal: BUTTON_PADDING_HORIZONTAL,
  },
  text: {
    fontSize: TEXT_FONT_SIZE,
    lineHeight: TEXT_FONT_SIZE,
    color: FILLED_TEXT_COLOR,
  },
  loadingIndicator: {
    color: FILLED_TEXT_COLOR,
  },
  disabledWrapper: {
    backgroundColor: DISABLED_BACKGROUND_COLOR,
  },
  disabledText: {
    color: DISABLED_TEXT_COLOR,
  },
};

export default StyleSheet.create(styles);
