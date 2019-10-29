import TextScreen from './Text';
import ButtonScreen from './Button';
import TextInputScreen from './TextInput';

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
  },
  TextInput: {
    screen: TextInputScreen,
    navigationOptions: {
      title: 'TextInput'
    }
  }
};
