import React from 'react';
import { Image } from 'react-native';
import {
  LARGE_SIZE,
  MEDIUM_SIZE,
} from 'rn-hero-design/src/themes/hero/variables';

const Avatar = ({ uri }) => (
  <Image
    source={{ uri }}
    style={{
      width: LARGE_SIZE * 2,
      height: LARGE_SIZE * 2,
      borderRadius: LARGE_SIZE,
      marginRight: MEDIUM_SIZE,
    }}
  />
);

export default Avatar;
