import { StyleSheet } from 'react-native';
import {
  HEADER_4,
  HEADER_5,
  MEDIUM_SIZE,
  BORDER_COLOR,
  LINK_TEXT_COLOR,
  GREY_5,
} from './variables';

const WRAPPER_BACKGROUND_COLOR = GREY_5;
const ACTIONS_BORDER_COLOR = BORDER_COLOR;
const ACTION_TEXT_FONT_SIZE = HEADER_4;
const ACTION_TEXT_LINE_HEIGHT = HEADER_5;
const ACTION_TEXT_COLOR = LINK_TEXT_COLOR;
const ACTION_PADDING_VERTICAL = MEDIUM_SIZE;
const ACTION_PADDING_HORIZONTAL = MEDIUM_SIZE;
const ACTION_HEIGHT = ACTION_TEXT_LINE_HEIGHT + ACTION_PADDING_VERTICAL * 2;

const styles = {
  wrapper: {
    backgroundColor: WRAPPER_BACKGROUND_COLOR,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ACTIONS_BORDER_COLOR,
  },
  action: {
    justifyContent: 'center',
    height: ACTION_HEIGHT,
    paddingHorizontal: ACTION_PADDING_HORIZONTAL,
  },
  actionText: {
    // DateTimePicker uses system font
    fontSize: ACTION_TEXT_FONT_SIZE,
    color: ACTION_TEXT_COLOR,
  },
};

export default StyleSheet.create(styles);
