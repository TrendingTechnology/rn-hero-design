import themeManager from './helpers/themeManager';
import injectTheme from './helpers/injectTheme';

import ReButton, { make as BaseButton } from './components/Button.bs';
import ReText, { make as BaseText } from './components/Text.bs';
import ReListItem, { make as BaseListItem } from './components/ListItem.bs';
import ReIcon, { make as BaseIcon } from './components/Icon.bs';
import ReTextInput, { make as BaseTextInput } from './components/TextInput.bs';
import ReSwitch, { make as BaseSwitch } from './components/Switch.bs';
import ReAvatar, { make as BaseAvatar } from './components/Avatar.bs';
import ReBottomButton, {
  make as BaseBottomButton,
} from './components/BottomButton.bs';
import ReDateTimePicker, {
  make as BaseDateTimePicker,
} from './components/DateTimePicker.bs';
import ReTabBar, { make as BaseTabBar } from './components/TabBar.bs';
import ReCard, { make as BaseCard } from './components/Card.bs';
import ReKeyboardAvoidingView, {
  make as BaseKeyboardAvoidingView,
} from './components/KeyboardAvoidingView.bs';
import ReContainer, { make as BaseContainer } from './components/Container.bs';
import ReMessage, { make as BaseMessage } from './components/Message.bs';
import ReSelect, { make as BaseSelect } from './components/Select.bs';
import ReMentionTextInput, {
  make as BaseMentionTextInput,
} from './components/MentionTextInput.bs';
import ReCalendar, { make as BaseCalendar } from './components/Calendar.bs';
import ReRadio, { make as BaseRadio } from './components/Radio.bs';
import RichTextEditor from './components/RichTextEditor';

export {
  //
  ReText,
  ReButton,
  ReTextInput,
  ReIcon,
  ReListItem,
  ReBottomButton,
  ReDateTimePicker,
  ReKeyboardAvoidingView,
  ReContainer,
  ReCard,
  ReSwitch,
  ReAvatar,
  ReTabBar,
  ReMessage,
  ReSelect,
  ReMentionTextInput,
  ReCalendar,
  ReRadio,
  //
  ReText as Text,
  ReButton as Button,
  ReTextInput as TextInput,
  ReIcon as Icon,
  ReListItem as ListItem,
  ReBottomButton as BottomButton,
  ReDateTimePicker as DateTimePicker,
  ReKeyboardAvoidingView as KeyboardAvoidingView,
  ReContainer as Container,
  ReCard as Card,
  ReSwitch as Switch,
  ReAvatar as Avatar,
  ReTabBar as TabBar,
  ReMessage as Message,
  ReSelect as Select,
  ReMentionTextInput as MentionTextInput,
  ReCalendar as Calendar,
  ReRadio as Radio,
  RichTextEditor,
  //
  BaseText,
  BaseButton,
  BaseTextInput,
  BaseIcon,
  BaseListItem,
  BaseBottomButton,
  BaseDateTimePicker,
  BaseKeyboardAvoidingView,
  BaseContainer,
  BaseCard,
  BaseSwitch,
  BaseAvatar,
  BaseTabBar,
  BaseMessage,
  BaseSelect,
  BaseMentionTextInput,
  BaseCalendar,
  BaseRadio,
  //
  themeManager,
  injectTheme,
};
