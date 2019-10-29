import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button } from 'rn-hero-design';

const callback = () => Alert.alert('Button clicked!');

const ButtonScreen = () => (
  <View style={styles.container}>
    <Button text="Button" onPress={callback} style={{ marginBottom: 16 }} />
    <Button
      text="Loading"
      onPress={callback}
      loading
      style={{ marginBottom: 16 }}
    />
    <Button
      text="Disabled"
      onPress={callback}
      disabled
      style={{ marginBottom: 16 }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default ButtonScreen;
