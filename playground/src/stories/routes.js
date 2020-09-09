import TextScreen from './Text';
import ButtonScreen from './Button';
import LoginScreen from './LoginScreen';

export default {
  Text: {
    screen: TextScreen,
  },
  Button: {
    screen: ButtonScreen,
  },
  LoginScreen: {
    screen: LoginScreen,
    options: {
      headerShown: false,
    },
  },
};
