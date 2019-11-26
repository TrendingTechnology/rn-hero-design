import React from 'react';
import t from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import heroTheme from '../themes/hero';

import email from '../icons/email.svg';
import emailOutline from '../icons/email-outline.svg';
import eye from '../icons/eye.svg';
import eyeOutline from '../icons/eye-outline.svg';
import eyeInvisible from '../icons/eye-invisible.svg';
import eyeInvisibleOutline from '../icons/eye-invisible-outline.svg';
import okCircle from '../icons/ok-circle.svg';
import calendar from '../icons/calendar.svg';
import clockCircleOutline from '../icons/clock-circle-outline.svg';
import commentOutline from '../icons/comment-outline.svg';
import cancelOutline from '../icons/cancel-outline.svg';
import plusCircleOutline from '../icons/plus-circle-outline.svg';
import plusOutline from '../icons/plus-outline.svg';

const SVG_ICONS = {
  email,
  'email-outline': emailOutline,
  eye,
  'eye-outline': eyeOutline,
  'eye-invisible': eyeInvisible,
  'eye-invisible-outline': eyeInvisibleOutline,
  'ok-circle': okCircle,
  calendar,
  'clock-circle-outline': clockCircleOutline,
  'comment-outline': commentOutline,
  'cancel-outline': cancelOutline,
  'plus-circle-outline': plusCircleOutline,
  'plus-outline': plusOutline,
};

const Icon = ({
  icon,
  size = 24,
  color,
  wrapperStyle,
  theme = heroTheme,
  ...props
}) =>
  SVG_ICONS[icon] ? (
    <View
      style={StyleSheet.compose(
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
        },
        wrapperStyle,
      )}
      {...props}
    >
      <SvgXml
        xml={SVG_ICONS[icon]}
        override={{
          width: size,
          height: size,
          fill: color || theme.icon.icon.color,
        }}
      />
    </View>
  ) : null;

Icon.propTypes = {
  /**
   * Name of the icon, in kebab case
   */
  icon: t.string,
  size: t.number,
  color: t.string,
  wrapperStyle: t.object,
  /**
   * The theme object contains style of all components. Can be injected by `injectTheme` HOC
   */
  theme: t.object,
};

export default Icon;
