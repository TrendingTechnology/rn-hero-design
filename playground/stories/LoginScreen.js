import React, { useState } from 'react';
import { View, Image, SafeAreaView, StyleSheet } from 'react-native';
import { TextInput, Button, Text, KeyboardAvoidingView } from 'rn-hero-design';
import {
  FOCUS_BLUE_1,
  FOCUS_BLUE_3,
  INVERTED_TEXT_COLOR,
} from 'rn-hero-design/src/themes/hero/variables';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('toan@gmail.com');
  const [password, setPassword] = useState('123456');
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <View style={styles.loginForm}>
          <Image
            source={require('../assets/login_logo.png')}
            resizeMode="contain"
            style={styles.logo}
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={value => setEmail(value)}
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
            rightIcon={
              visiblePassword ? 'eye-invisible-outline' : 'eye-outline'
            }
            onChangeText={value => setPassword(value)}
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
            onPress={() => navigation.goBack()}
            wrapperStyle={{ marginBottom: 28 }}
          />

          <Text
            size="h5"
            color={INVERTED_TEXT_COLOR}
            style={{ marginBottom: 24, textAlign: 'center' }}
          >
            Email me a magic login link
          </Text>

          <Text
            size="h5"
            color={INVERTED_TEXT_COLOR}
            style={{ marginBottom: 24, textAlign: 'center' }}
          >
            Selected region:{' '}
            <Text
              size="h5"
              weight="bold"
              color={INVERTED_TEXT_COLOR}
              style={{
                textDecorationLine: 'underline',
              }}
            >
              European Union (EU)
            </Text>
          </Text>
        </View>

        <View style={styles.pusher} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: FOCUS_BLUE_1,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loginForm: {
    paddingHorizontal: 24,
  },
  pusher: {
    flex: 1,
  },
  logo: {
    height: 100,
    marginVertical: 64,
    alignSelf: 'center',
  },
});

LoginScreen.navigationOptions = {
  header: null,
};

export default LoginScreen;
