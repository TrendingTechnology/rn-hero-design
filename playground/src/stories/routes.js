import TextScreen from './Text';
import ButtonScreen from './Button';
import TextInputScreen from './TextInput';
import BottomButtonScreen from './BottomButton';
import IconScreen from './Icon';
import ListItemScreen from './ListItem';
import DateTimePickerScreen from './DateTimePicker';
import CalendarScreen from './Calendar';

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
  ListItem: {
    screen: ListItemScreen,
  },
  DateTimePicker: {
    screen: DateTimePickerScreen,
  },
  Calendar: {
    screen: CalendarScreen,
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
