import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'rn-hero-design';

const TextInputScreen = () => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          label="Email"
          value="toan.nguyen@employmenthero.com"
          rightIcon="email-outline"
        />

        <TextInput
          label="Password"
          value="123456"
          rightIcon="eye-outline"
          secureTextEntry
        />

        <TextInput
          label="Confirm password"
          value="12345"
          rightIcon="eye-outline"
          secureTextEntry
          error="Password not matched"
          wrapperStyle={{ marginBottom: 32 }}
        />

        <TextInput label="Region" value="Vietnam" disabled />
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
