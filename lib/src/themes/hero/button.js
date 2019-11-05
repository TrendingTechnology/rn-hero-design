import { StyleSheet } from 'react-native';
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

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: WRAPPER_HEIGHT,
    paddingHorizontal: WRAPPER_PADDING_HORIZONTAL,
    borderRadius: WRAPPER_BORDER_RADIUS,
  },
  text: {
    fontSize: TEXT_FONT_SIZE,
    lineHeight: TEXT_FONT_SIZE,
  },
  filledWrapper: {
    backgroundColor: FILLED_BACKGROUND_COLOR,
  },
  filledText: {
    color: FILLED_TEXT_COLOR,
  },
  filledLoadingIndicator: {
    color: FILLED_TEXT_COLOR,
  },
  outlinedWrapper: {
    borderWidth: 1.2,
    borderColor: OUTLINED_BORDER_COLOR,
    backgroundColor: 'transparent',
  },
  outlinedText: {
    fontWeight: '500',
    color: OUTLINED_TEXT_COLOR,
  },
  outlinedLoadingIndicator: {
    color: OUTLINED_TEXT_COLOR,
  },
  disabledWrapper: {
    borderWidth: 0,
    backgroundColor: DISABLED_BACKGROUND_COLOR,
  },
  disabledText: {
    color: DISABLED_TEXT_COLOR,
  },
};

export default StyleSheet.create(styles);
