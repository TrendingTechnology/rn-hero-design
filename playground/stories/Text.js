import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'rn-hero-design';

const TextScreen = () => (
  <View style={styles.container}>
    <Text size="h1" style={{ marginBottom: 16 }}>
      The quick brown fox
    </Text>
    <Text size="h2" style={{ marginBottom: 16 }}>
      The quick brown fox
    </Text>
    <Text size="h3" style={{ marginBottom: 16 }}>
      The quick brown fox
    </Text>
    <Text style={{ marginBottom: 16 }}>The quick brown fox</Text>
    <Text weight="500" style={{ marginBottom: 16 }}>
      The quick brown fox
    </Text>
    <Text weight="600" style={{ marginBottom: 16 }}>
      The quick brown fox
    </Text>
    <Text weight="700" style={{ marginBottom: 16 }}>
      The quick brown fox
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default TextScreen;
