import TextScreen from './Text';
import ButtonScreen from './Button';
import TextInputScreen from './TextInput';
import LoginScreen from './LoginScreen';

export default {
  Text: {
    screen: TextScreen,
  },
  Button: {
    screen: ButtonScreen,
  },
  TextInput: {
    screen: TextInputScreen,
  },
  LoginScreen: {
    screen: LoginScreen,
    options: {
      headerShown: false,
    },
  },
};
