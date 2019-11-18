import { Dimensions } from 'react-native';
import { getInset } from 'react-native-safe-area-view';

export default () => {
  const { width, height } = Dimensions.get('window');
  const isLandscape = width > height;
  const bottomPadding = getInset('bottom', isLandscape);
  return bottomPadding > 0;
};
