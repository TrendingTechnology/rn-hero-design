import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button } from 'rn-hero-design';

const callback = () => Alert.alert('Button clicked!');

const ButtonScreen = () => (
  <View style={styles.container}>
    <Button
      text="Filled Button"
      onPress={callback}
      wrapperStyle={{ marginBottom: 16 }}
    />
    <Button
      text="Loading Filled Button"
      onPress={callback}
      loading
      wrapperStyle={{ marginBottom: 16 }}
    />
    <Button
      text="Disabled Filled Button"
      onPress={callback}
      disabled
      wrapperStyle={{ marginBottom: 32 }}
    />

    <Button
      variant="outlined"
      text="Outlined Button"
      onPress={callback}
      wrapperStyle={{ marginBottom: 16 }}
    />
    <Button
      variant="outlined"
      text="Loading Outlined Button"
      onPress={callback}
      loading
      wrapperStyle={{ marginBottom: 16 }}
    />
    <Button
      variant="outlined"
      text="Disabled Outlined Button"
      onPress={callback}
      disabled
      wrapperStyle={{ marginBottom: 16 }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default ButtonScreen;
