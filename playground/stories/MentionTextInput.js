import React from 'react';
import { View } from 'react-native';
import { MentionTextInput } from 'rn-hero-design';

const MentionTextInputScreen = () => (
  <View>
    <MentionTextInput
      value={[
        {
          text: 'Thanks ',
        },
        {
          text: '@Gia Toan',
          id: 1,
        },
        {
          text: ' and ',
        },
        {
          text: '@Gia Toan',
          id: 2,
        },
        {
          text: ' and ',
        },
        {
          text: '@Gia Toan',
          id: 2,
        },
        {
          text: ' for implementing such a great component',
        },
      ]}
    />
  </View>
);

export default MentionTextInputScreen;
