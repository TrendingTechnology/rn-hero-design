import React from 'react';
import { ScrollView } from 'react-native';
import {
  Text,
  TextInput,
  BottomButton,
  KeyboardAvoidingView,
  injectTheme,
} from 'rn-hero-design';

const noop = () => {};

const TextInputScreen = ({ theme }) => (
  <KeyboardAvoidingView withNavigation style={{ flex: 1 }}>
    <ScrollView
      contentContainerStyle={{ padding: theme.variables.MEDIUM_SIZE }}>
      <TextInput
        label="Email"
        defaultValue="gia.toan@employmenthero.com"
        rightIcon="email-outline"
        onChange={console.log}
      />

      <TextInput
        keyboardType="numeric"
        label="Password"
        value="12345678"
        rightIcon="eye-outline"
        onChangeText={noop}
        secureTextEntry
      />

      <TextInput
        keyboardType="numeric"
        label="Confirm password"
        value="1234567"
        rightIcon="eye-outline"
        onChangeText={noop}
        secureTextEntry
        error="Password not matched"
      />

      <TextInput label="Region" value="Vietnam" disabled onChangeText={noop} />

      <Text size="h5">* By sign-up, you agree to our terms and conditions</Text>
    </ScrollView>

    <BottomButton text="Register" onPress={() => {}} />
  </KeyboardAvoidingView>
);

export default injectTheme(TextInputScreen);
