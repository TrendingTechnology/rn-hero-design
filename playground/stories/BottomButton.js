import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { BottomButton } from 'rn-hero-design';

const callback = () => Alert.alert('Button clicked!');

const BottomButtonScreen = () => (
  <View style={styles.container}>
    <View style={styles.pusher} />
    <BottomButton text="Bottom Button" onPress={callback} />
    <BottomButton text="Bottom Button" onPress={callback} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pusher: {
    flex: 1,
  },
});

export default BottomButtonScreen;
