import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { BottomButton } from 'rn-hero-design';
import { RED } from 'rn-hero-design/src/themes/hero/variables';

const callback = () => Alert.alert('Button clicked!');

const BottomButtonScreen = () => (
  <View style={styles.container}>
    <View style={styles.pusher} />
    <BottomButton
      text="Custom Button"
      onPress={callback}
      wrapperStyle={{ marginBottom: 16, backgroundColor: RED, borderRadius: 8 }}
    />
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
