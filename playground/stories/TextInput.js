import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'rn-hero-design';

const TextInputScreen = () => (
  <View style={styles.container}>
    <TextInput placeholder="email" />
    <TextInput placeholder="email" value="toan.nguyen@employmenthero.com" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default TextInputScreen;
