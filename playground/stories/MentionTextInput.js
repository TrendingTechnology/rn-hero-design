import React from 'react';
import { View } from 'react-native';
import { MentionTextInput } from 'rn-hero-design';

const sampleValue = [
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
];

const MentionTextInputScreen = () => {
  const [value, setValue] = React.useState(sampleValue);

  return (
    <View>
      <MentionTextInput value={value} onChange={value => setValue(value)} />
    </View>
  );
};

export default MentionTextInputScreen;
