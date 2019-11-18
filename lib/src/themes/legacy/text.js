import { StyleSheet } from 'react-native';
import {
  TEXT_COLOR,
  HEADER_1,
  HEADER_2,
  HEADER_3,
  HEADER_4,
  HEADER_5,
} from './variables';

const COLOR = TEXT_COLOR;
const FONT_SIZE = HEADER_4;
const H1_FONT_SIZE = HEADER_1;
const H2_FONT_SIZE = HEADER_2;
const H3_FONT_SIZE = HEADER_3;
const H4_FONT_SIZE = HEADER_4;
const H5_FONT_SIZE = HEADER_5;

const styles = {
  text: {
    fontSize: FONT_SIZE,
    color: COLOR,
  },
  h1: {
    fontSize: H1_FONT_SIZE,
  },
  h2: {
    fontSize: H2_FONT_SIZE,
  },
  h3: {
    fontSize: H3_FONT_SIZE,
  },
  h4: {
    fontSize: H4_FONT_SIZE,
  },
  h5: {
    fontSize: H5_FONT_SIZE,
  },
};

export default StyleSheet.create(styles);
