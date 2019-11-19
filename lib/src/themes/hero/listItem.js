import { StyleSheet } from 'react-native';
import {
  HEADER_4,
  HEADER_5,
  MEDIUM_SIZE,
  TEXT_COLOR,
  MUTED_TEXT_COLOR,
  BORDER_COLOR,
  FONT_FAMILY,
} from './variables';

const TITLE_FONT_SIZE = HEADER_4;
const TITLE_LINE_HEIGHT = TITLE_FONT_SIZE * 1.4;
const TITLE_COLOR = TEXT_COLOR;
const SUBTITLE_FONT_SIZE = HEADER_5;
const SUBTITLE_LINE_HEIGHT = SUBTITLE_FONT_SIZE * 1.4;
const SUBTITLE_COLOR = MUTED_TEXT_COLOR;
const WRAPPER_PADDING_VERTICAL = MEDIUM_SIZE;
const WRAPPER_PADDING_HORIZONTAL = MEDIUM_SIZE;
const WRAPPER_HEIGHT =
  TITLE_LINE_HEIGHT + SUBTITLE_LINE_HEIGHT + WRAPPER_PADDING_VERTICAL * 2;
const WRAPPER_BORDER_COLOR = BORDER_COLOR;

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: WRAPPER_HEIGHT,
    paddingVertical: WRAPPER_PADDING_VERTICAL,
    paddingHorizontal: WRAPPER_PADDING_HORIZONTAL,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: WRAPPER_BORDER_COLOR,
  },
  title: {
    fontFamily: FONT_FAMILY,
    fontSize: TITLE_FONT_SIZE,
    fontWeight: '500',
    lineHeight: TITLE_LINE_HEIGHT,
    color: TITLE_COLOR,
  },
  subtitle: {
    fontFamily: FONT_FAMILY,
    fontSize: SUBTITLE_FONT_SIZE,
    fontWeight: '500',
    lineHeight: SUBTITLE_LINE_HEIGHT,
    color: SUBTITLE_COLOR,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export default StyleSheet.create(styles);
