import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'rn-hero-design';
import {
  FOCUS_BLUE_1,
  FOCUS_BLUE_3,
  INVERTED_TEXT_COLOR,
} from 'rn-hero-design/src/themes/hero/variables';

const LoginScreen = () => {
  const [email, setEmail] = useState('toan@gmail.com');
  const [password, setPassword] = useState('123456');
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          label="Email"
          value={email}
          onChange={value => setEmail(value)}
          labelStyle={{ color: INVERTED_TEXT_COLOR }}
          inputStyle={{
            color: INVERTED_TEXT_COLOR,
            borderBottomColor: FOCUS_BLUE_3,
          }}
          iconStyle={{ color: INVERTED_TEXT_COLOR }}
        />

        <TextInput
          label="Password"
          value={password}
          rightIcon={visiblePassword ? 'eye-invisible-outline' : 'eye-outline'}
          onChange={value => setPassword(value)}
          onPressIcon={() => setVisiblePassword(!visiblePassword)}
          secureTextEntry={!visiblePassword}
          wrapperStyle={{ marginBottom: 32 }}
          labelStyle={{ color: INVERTED_TEXT_COLOR }}
          inputStyle={{
            color: INVERTED_TEXT_COLOR,
            borderBottomColor: FOCUS_BLUE_3,
          }}
          iconStyle={{ color: INVERTED_TEXT_COLOR }}
        />

        <Button
          text="Log In"
          onPress={() => {}}
          wrapperStyle={{ marginBottom: 16 }}
        />

        <Text
          size="h5"
          color={INVERTED_TEXT_COLOR}
          style={{ textAlign: 'center' }}
        >
          Email me a magic login link
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: FOCUS_BLUE_1,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 128,
  },
});

LoginScreen.navigationOptions = {
  title: null,
  headerStyle: {
    backgroundColor: FOCUS_BLUE_1,
    borderBottomWidth: 0,
  },
};

export default LoginScreen;
