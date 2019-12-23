import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import TextScreen from './Text';
import ButtonScreen from './Button';
import TextInputScreen from './TextInput';
import IconScreen from './Icon';
import LoginScreen from './LoginScreen';
import ListItemScreen from './ListItem';
import BottomButtonScreen from './BottomButton';
import DateTimePickerScreen from './DateTimePicker';
import LeaveRequestScreen from './LeaveRequestScreen';
import CardScreen from './Card';
import SwitchScreen from './Switch';
import darkKnightTheme from 'rn-hero-design/src/themes/dark-knight';

const store = createStore(state => state, { __theme: 'dark-knight' });
const DarkLeaveRequestScreen = () => (
  <Provider store={store}>
    <LeaveRequestScreen theme={darkKnightTheme} />
  </Provider>
);
DarkLeaveRequestScreen.navigationOptions = LeaveRequestScreen.navigationOptions;

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
  Card: {
    screen: CardScreen,
    defaultNavigationOptions: {
      title: 'Card',
    },
  },
  Switch: {
    screen: SwitchScreen,
    defaultNavigationOptions: {
      title: 'Switch',
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
  DarkLeaveRequestScreen: {
    screen: DarkLeaveRequestScreen,
    defaultNavigationOptions: {
      title: '🌒 Dark Leave Request Screen',
    },
  },
};
