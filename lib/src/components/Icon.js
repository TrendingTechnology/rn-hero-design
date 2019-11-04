import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import heroTheme from '../themes/hero';

import email from '../icons/email.svg';
import emailOutline from '../icons/email-outline.svg';
import eye from '../icons/eye.svg';
import eyeOutline from '../icons/eye-outline.svg';

const SVG_ICONS = {
  email,
  'email-outline': emailOutline,
  eye,
  'eye-outline': eyeOutline,
};

const Icon = ({ icon, size = 24, color, wrapperStyle, theme = heroTheme }) =>
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
    >
      <SvgXml
        xml={SVG_ICONS[icon]}
        override={{
          width: size,
          height: size,
          color: color || theme.icon.icon.color,
        }}
      />
    </View>
  ) : null;

export default Icon;
