import React from 'react';
import { ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { TextInput, BottomButton, Text } from 'rn-hero-design';

const noop = () => {};

const TextInputScreen = () => (
  <KeyboardAvoidingView
    behavior="padding"
    keyboardVerticalOffset={88}
    enabled
    style={styles.keyboardAvoidingView}
  >
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Email"
        value="toan.nguyen@employmenthero.com"
        rightIcon="email-outline"
        onChangeText={noop}
      />

      <TextInput
        label="Password"
        value="123456"
        rightIcon="eye-outline"
        onChangeText={noop}
        secureTextEntry
      />

      <TextInput
        label="Confirm password"
        value="12345"
        rightIcon="eye-outline"
        onChangeText={noop}
        secureTextEntry
        error="Password not matched"
        wrapperStyle={{ marginBottom: 32 }}
      />

      <TextInput label="Region" value="Vietnam" disabled onChangeText={noop} />

      <Text>* By signing up, you agree to our terms and conditions</Text>
    </ScrollView>

    <BottomButton text="Register" onPress={() => {}} />
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
});

export default TextInputScreen;
