import TextScreen from './Text';
import ButtonScreen from './Button';
import TextInputScreen from './TextInput';
import RichTextEditorScreen from './RichTextEditor';
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
  RichTextEditor: {
    screen: RichTextEditorScreen,
    options: {
      title: 'New Announcement',
    },
  },
  LoginScreen: {
    screen: LoginScreen,
    options: {
      headerShown: false,
    },
  },
};
