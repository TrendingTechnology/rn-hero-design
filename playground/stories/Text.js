import React from 'react';
import { ScrollView } from 'react-native';
import { Text, ReText } from 'rn-hero-design';

const TextScreen = () => (
  <ScrollView>
    <Text size="h1" style={{ marginBottom: 16 }}>
      🐔 The quick brown fox
    </Text>
    <Text size="h2" style={{ marginBottom: 16 }}>
      🐔 The quick brown fox
    </Text>
    <Text size="h3" style={{ marginBottom: 16 }}>
      🐔 The quick brown fox
    </Text>
    <Text style={{ marginBottom: 16 }}>🐔 The quick brown fox</Text>
    <Text weight="500" style={{ marginBottom: 16 }}>
      🐔 The quick brown fox
    </Text>
    <Text weight="600" style={{ marginBottom: 16 }}>
      🐔 The quick brown fox
    </Text>
    <Text weight="700" style={{ marginBottom: 32 }}>
      🐔 The quick brown fox
    </Text>

    <ReText size={'h1'} style={{ marginBottom: 16 }}>
      🐪 The quick brown fox
    </ReText>
    <ReText size={'h2'} style={{ marginBottom: 16 }}>
      🐪 The quick brown fox
    </ReText>
    <ReText size={'h3'} style={{ marginBottom: 16 }}>
      🐪 The quick brown fox
    </ReText>
    <ReText style={{ marginBottom: 16 }}>🐪 The quick brown fox</ReText>
    <ReText weight={'500'} style={{ marginBottom: 16 }}>
      🐪 The quick brown fox
    </ReText>
    <ReText weight={'600'} style={{ marginBottom: 16 }}>
      🐪 The quick brown fox
    </ReText>
    <ReText weight={'700'} style={{ marginBottom: 16 }}>
      🐪 The quick brown fox
    </ReText>
  </ScrollView>
);

export default TextScreen;
