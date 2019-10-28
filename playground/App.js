import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'rn-hero-design';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello Expo!</Text>
      <Button />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
