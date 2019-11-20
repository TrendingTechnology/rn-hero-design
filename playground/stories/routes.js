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
  BottomButton: {
    screen: BottomButtonScreen,
    navigationOptions: {
      title: 'BottomButton',
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
  ListItem: {
    screen: ListItemScreen,
    navigationOptions: {
      title: 'ListItem',
    },
  },
  DateTimePicker: {
    screen: DateTimePickerScreen,
    navigationOptions: {
      title: 'DateTimePicker',
    },
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      title: '🎩 Login Screen',
    },
  },
  LeaveRequestScreen: {
    screen: LeaveRequestScreen,
    navigationOptions: {
      title: '✈️ Leave Request Screen',
    },
  },
};
