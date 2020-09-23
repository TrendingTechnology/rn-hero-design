import TextScreen from './Text';
import ButtonScreen from './Button';
import TextInputScreen from './TextInput';
import BottomButtonScreen from './BottomButton';
import IconScreen from './Icon';

import RichTextEditorScreen from './RichTextEditor';
import LoginScreen from './LoginScreen';

export default {
  Text: {
    screen: TextScreen,
  },
  Button: {
    screen: ButtonScreen,
  },
  BottomButton: {
    screen: BottomButtonScreen,
  },
  TextInput: {
    screen: TextInputScreen,
  },
  Icon: {
    screen: IconScreen,
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
