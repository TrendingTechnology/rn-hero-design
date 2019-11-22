import TextScreen from './Text';
import ButtonScreen from './Button';
import TextInputScreen from './TextInput';
import IconScreen from './Icon';
import LoginScreen from './LoginScreen';
import ListItemScreen from './ListItem';
import BottomButtonScreen from './BottomButton';
import DateTimePickerScreen from './DateTimePicker';
import LeaveRequestScreen from './LeaveRequestScreen';

export default {
  Text: {
    screen: TextScreen,
    defaultNavigationOptions: {
      title: 'Typo',
    },
  },
  Button: {
    screen: ButtonScreen,
    defaultNavigationOptions: {
      title: 'Button',
    },
  },
  BottomButton: {
    screen: BottomButtonScreen,
    defaultNavigationOptions: {
      title: 'BottomButton',
    },
  },
  TextInput: {
    screen: TextInputScreen,
    defaultNavigationOptions: {
      title: 'TextInput',
    },
  },
  Icon: {
    screen: IconScreen,
    defaultNavigationOptions: {
      title: 'Icon',
    },
  },
  ListItem: {
    screen: ListItemScreen,
    defaultNavigationOptions: {
      title: 'ListItem',
    },
  },
  DateTimePicker: {
    screen: DateTimePickerScreen,
    defaultNavigationOptions: {
      title: 'DateTimePicker',
    },
  },
  LoginScreen: {
    screen: LoginScreen,
    defaultNavigationOptions: {
      title: '🥑 Login Screen',
    },
  },
  LeaveRequestScreen: {
    screen: LeaveRequestScreen,
    defaultNavigationOptions: {
      title: '🍉 Leave Request Screen',
    },
  },
};
