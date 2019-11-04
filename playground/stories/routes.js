import TextScreen from './Text';
import ButtonScreen from './Button';
import TextInputScreen from './TextInput';
import IconScreen from './Icon';

export default {
  Text: {
    screen: TextScreen,
    navigationOptions: {
      title: 'Typo',
    },
  },
  Button: {
    screen: ButtonScreen,
    navigationOptions: {
      title: 'Button',
    },
  },
  TextInput: {
    screen: TextInputScreen,
    navigationOptions: {
      title: 'TextInput',
    },
  },
  Icon: {
    screen: IconScreen,
    navigationOptions: {
      title: 'Icon',
    },
  },
};
