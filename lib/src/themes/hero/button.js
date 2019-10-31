import { StyleSheet } from 'react-native';
import {
  HEADER_4,
  PRIMARY_COLOR,
  WHITE,
  GREY_4,
  MEDIUM_SIZE,
} from './variables';

export const TEXT_FONT_SIZE = HEADER_4;
export const TEXT_COLOR = WHITE;

export const BACKGROUND_COLOR = PRIMARY_COLOR;
export const DISABLED_BACKGROUND_COLOR = GREY_4;

export const VERTICAL_PADDING = MEDIUM_SIZE;
export const HORIZONTAL_PADDING = MEDIUM_SIZE;
export const HEIGHT = TEXT_FONT_SIZE + VERTICAL_PADDING * 2;
export const BORDER_RADIUS = HEIGHT * 0.5;

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: HEIGHT,
    borderRadius: BORDER_RADIUS,
  },
  text: {
    fontSize: TEXT_FONT_SIZE,
    lineHeight: TEXT_FONT_SIZE,
  },

  filledWrapper: {
    backgroundColor: BACKGROUND_COLOR,
  },
  filledText: {
    color: TEXT_COLOR,
  },
  filledLoadingIndicator: {
    color: TEXT_COLOR,
  },

  outlinedWrapper: {
    borderWidth: 1.2,
    borderColor: BACKGROUND_COLOR,
    backgroundColor: 'transparent',
  },
  outlinedText: {
    fontWeight: '500',
    color: BACKGROUND_COLOR,
  },
  outlinedLoadingIndicator: {
    color: BACKGROUND_COLOR,
  },

  disabledWrapper: {
    borderWidth: 0,
    backgroundColor: DISABLED_BACKGROUND_COLOR,
  },
  disabledText: {
    color: TEXT_COLOR,
  },
};

export default StyleSheet.create(styles);
