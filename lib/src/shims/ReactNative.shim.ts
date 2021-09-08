import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputSelectionChangeEventData,
  TextInputKeyPressEventData,
  ImageSourcePropType,
  ViewStyle,
  StyleProp,
  TextStyle,
  ImageStyle,
} from 'react-native';

export type Style_t = ViewStyle & TextStyle & ImageStyle;
export type Color_t = string;
export type Event_pressEvent = () => void;

export type TextInput_changeEvent = (
  e: NativeSyntheticEvent<TextInputChangeEventData>,
) => void;

export type TextInput_selectionChangeEvent = (
  e: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
) => void;

export type TextInput_keyPressEvent = (
  e: NativeSyntheticEvent<TextInputKeyPressEventData>,
) => void;

export type Image_Source_t = ImageSourcePropType;
