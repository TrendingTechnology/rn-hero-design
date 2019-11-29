import { StyleSheet } from 'react-native';
import { MEDIUM_SIZE } from './variables';

const CONTAINER_PADDING = MEDIUM_SIZE;

const styles = {
  container: {
    padding: CONTAINER_PADDING,
  },
  fluid: {
    flex: 1,
  },
};

export default StyleSheet.create(styles);
