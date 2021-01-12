import React from 'react';
import { Image } from 'react-native';
import { themeManager } from 'rn-hero-design';

import TextScreen from './Text';
import ButtonScreen from './Button';
import TextInputScreen from './TextInput';
import BottomButtonScreen from './BottomButton';
import IconScreen from './Icon';
import ListItemScreen from './ListItem';
import DateTimePickerScreen from './DateTimePicker';
import CalendarScreen from './Calendar';
import CardScreen from './Card';
import SwitchScreen from './Switch';
import AvatarScreen from './Avatar';
import TabBarScreen from './TabBar';
import MessageScreen from './Message';
import SelectScreen from './Select';
import MentionTextInputScreen from './MentionTextInput';
import RadioScreen from './Radio';
import RichTextEditorScreen from './RichTextEditor';
import ButtonGroupScreen from './ButtonGroup';
import ErrorScreen from './ErrorScreen';
import BadgeScreen from './Badge';

import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import LeaveRequestScreen from './LeaveRequestScreen';
import FeedbackScreen from './FeedbackScreen';

const heroTheme = themeManager.getTheme();

const Logo = () => (
  <Image
    source={require('../images/header_logo.png')}
    resizeMode="contain"
    style={{ height: 28 }}
  />
);

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
  Card: {
    screen: CardScreen,
    options: {
      headerTitle: Logo,
      headerStyle: {
        backgroundColor: heroTheme.variables.FOCUS_BLUE_1,
        borderBottomWidth: 0,
      },
    },
  },
  Switch: {
    screen: SwitchScreen,
  },
  Avatar: {
    screen: AvatarScreen,
  },
  TabBar: {
    screen: TabBarScreen,
  },
  Message: {
    screen: MessageScreen,
  },
  Select: {
    screen: SelectScreen,
  },
  MentionTextInput: {
    screen: MentionTextInputScreen,
    options: {
      title: 'Give a Shout Out',
      headerStyle: {
        backgroundColor: heroTheme.variables.FOCUS_BLUE_1,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: heroTheme.variables.WHITE,
      },
    },
  },
  Calendar: {
    screen: CalendarScreen,
  },
  Radio: {
    screen: RadioScreen,
  },
  RichTextEditor: {
    screen: RichTextEditorScreen,
    options: {
      title: 'New Announcement',
    },
  },
  ButtonGroup: {
    screen: ButtonGroupScreen,
  },
  ErrorScreen: {
    screen: ErrorScreen,
  },
  Badge: {
    screen: BadgeScreen,
  },

  LoginScreen: {
    screen: LoginScreen,
    badge: 'Demo',
    options: {
      headerShown: false,
    },
  },
  ProfileScreen: {
    screen: ProfileScreen,
    badge: 'Demo',
    options: {
      title: 'Profile',
      headerStyle: {
        backgroundColor: heroTheme.variables.FOCUS_BLUE_1,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: heroTheme.variables.WHITE,
      },
    },
  },
  LeaveRequestScreen: {
    screen: LeaveRequestScreen,
    badge: 'Demo',
    options: {
      title: 'Leave request',
      headerStyle: {
        backgroundColor: heroTheme.variables.FOCUS_BLUE_1,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: heroTheme.variables.WHITE,
      },
    },
  },
  FeedbackScreen: {
    screen: FeedbackScreen,
    badge: 'Demo',
    options: {
      title: 'Share some feedback',
      headerStyle: {
        backgroundColor: heroTheme.variables.FOCUS_BLUE_1,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: heroTheme.variables.WHITE,
      },
    },
  },
};
