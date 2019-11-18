import TextScreen from './Text';
import ButtonScreen from './Button';
import TextInputScreen from './TextInput';
import IconScreen from './Icon';
import LoginScreen from './LoginScreen';
import ListItemScreen from './ListItem';
import BottomButtonScreen from './BottomButton';

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
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      title: '🎩 Login Screen',
    },
  },
  ListItem: {
    screen: ListItemScreen,
    navigationOptions: {
      title: 'ListItem',
    },
  },
  BottomButton: {
    screen: BottomButtonScreen,
    navigationOptions: {
      title: 'BottomButton',
    },
  },
};
