import TextScreen from './Text';
import ButtonScreen from './Button';

export default {
  Text: {
    screen: TextScreen,
    navigationOptions: {
      title: 'Typo'
    }
  },
  Button: {
    screen: ButtonScreen,
    navigationOptions: {
      title: 'Button'
    }
  }
};
