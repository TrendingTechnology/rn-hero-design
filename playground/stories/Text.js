import React from 'react';
import { ScrollView } from 'react-native';
import { Text, ReText, textSizeFromJs, textWeightFromJs } from 'rn-hero-design';

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
    <Text style={{ marginBottom: 16 }}>The quick brown fox</Text>
    <Text weight="500" style={{ marginBottom: 16 }}>
      🐔 The quick brown fox
    </Text>
    <Text weight="600" style={{ marginBottom: 16 }}>
      🐔 The quick brown fox
    </Text>
    <Text weight="700" style={{ marginBottom: 16 }}>
      🐔 The quick brown fox
    </Text>

    <ReText
      size={textSizeFromJs('h1')}
      style={{ marginBottom: 16, marginTop: 16 }}
    >
      🐪 The quick brown fox
    </ReText>
    <ReText size={textSizeFromJs('h2')} style={{ marginBottom: 16 }}>
      🐪 The quick brown fox
    </ReText>
    <ReText size={textSizeFromJs('h3')} style={{ marginBottom: 16 }}>
      🐪 The quick brown fox
    </ReText>
    <ReText style={{ marginBottom: 16 }}>🐪 The quick brown fox</ReText>
    <ReText weight={textWeightFromJs('500')} style={{ marginBottom: 16 }}>
      🐪 The quick brown fox
    </ReText>
    <ReText weight={textWeightFromJs('600')} style={{ marginBottom: 16 }}>
      🐪 The quick brown fox
    </ReText>
    <ReText weight={textWeightFromJs('700')} style={{ marginBottom: 16 }}>
      🐪 The quick brown fox
    </ReText>
  </ScrollView>
);

export default TextScreen;
