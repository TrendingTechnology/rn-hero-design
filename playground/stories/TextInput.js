import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'rn-hero-design';

const noop = () => {};

const TextInputScreen = () => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          label="Email"
          value="toan.nguyen@employmenthero.com"
          rightIcon="email-outline"
          onChange={noop}
        />

        <TextInput
          label="Password"
          value="123456"
          rightIcon="eye-outline"
          onChange={noop}
          secureTextEntry
        />

        <TextInput
          label="Confirm password"
          value="12345"
          rightIcon="eye-outline"
          onChange={noop}
          secureTextEntry
          error="Password not matched"
          wrapperStyle={{ marginBottom: 32 }}
        />

        <TextInput label="Region" value="Vietnam" disabled onChange={noop} />

        <Text>* By signing up, you agree to our terms and conditions</Text>
      </View>

      <Button text="Register" onPress={() => {}} />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  inputGroup: {
    flex: 1,
  },
});

export default TextInputScreen;
