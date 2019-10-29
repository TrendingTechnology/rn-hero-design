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

export default StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: HEIGHT,
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS,
  },
  loading: {
    opacity: 0.6,
  },
  disabled: {
    backgroundColor: DISABLED_BACKGROUND_COLOR,
  },
  text: {
    fontSize: TEXT_FONT_SIZE,
    lineHeight: TEXT_FONT_SIZE,
    color: TEXT_COLOR,
  },
});
