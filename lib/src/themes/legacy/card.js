import { StyleSheet } from 'react-native';
import {
  SMALL_SIZE,
  BACKGROUND_COLOR as GLOBAL_BACKGROUND_COLOR,
} from './variables';

const BACKGROUND_COLOR = GLOBAL_BACKGROUND_COLOR;
const BORDER_RADIUS = SMALL_SIZE;

const styles = {
  card: {
    overflow: 'hidden',
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS,
  },
};

export default StyleSheet.create(styles);
