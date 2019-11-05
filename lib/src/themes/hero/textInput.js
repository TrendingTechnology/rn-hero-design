import { StyleSheet } from 'react-native';
import {
  HEADER_4,
  HEADER_5,
  SMALL_SIZE,
  MEDIUM_SIZE,
  TEXT_COLOR,
  MUTED_TEXT_COLOR,
  DISABLED_TEXT_COLOR,
  BORDER_COLOR,
  DANGER_COLOR,
} from './variables';

const WRAPPER_MARGIN_VERTICAL = MEDIUM_SIZE;
const LABEL_FONT_SIZE = HEADER_5;
const LABEL_COLOR = MUTED_TEXT_COLOR;
const INPUT_FONT_SIZE = HEADER_4;
const INPUT_PADDING_VERTICAL = MEDIUM_SIZE;
const INPUT_HEIGHT = INPUT_FONT_SIZE + INPUT_PADDING_VERTICAL * 2;
const INPUT_BORDER_COLOR = BORDER_COLOR;
const INPUT_COLOR = TEXT_COLOR;
const ICON_COLOR = MUTED_TEXT_COLOR;
const ERROR_FONT_SIZE = HEADER_5;
const ERROR_MARGIN_VERTICAL = SMALL_SIZE;
const ERROR_COLOR = DANGER_COLOR;

const styles = {
  wrapper: {
    marginBottom: WRAPPER_MARGIN_VERTICAL,
  },
  label: {
    height: LABEL_FONT_SIZE,
    lineHeight: LABEL_FONT_SIZE,
    fontSize: LABEL_FONT_SIZE,
    fontWeight: '500',
    color: LABEL_COLOR,
  },
  textInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: INPUT_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: INPUT_BORDER_COLOR,
  },
  baseTextInput: {
    flex: 1,
    height: INPUT_HEIGHT,
    fontSize: INPUT_FONT_SIZE,
    color: INPUT_COLOR,
  },
  icon: {
    color: ICON_COLOR,
  },
  errorMessage: {
    height: ERROR_FONT_SIZE,
    lineHeight: ERROR_FONT_SIZE,
    marginTop: ERROR_MARGIN_VERTICAL,
    fontSize: ERROR_FONT_SIZE,
    fontWeight: '500',
    color: ERROR_COLOR,
  },
  errorLabel: {
    color: ERROR_COLOR,
  },
  errorTextInput: {
    borderBottomColor: ERROR_COLOR,
  },
  errorIcon: {
    color: ERROR_COLOR,
  },
  disabledBaseTextInput: {
    color: DISABLED_TEXT_COLOR,
  },
};

export default StyleSheet.create(styles);
