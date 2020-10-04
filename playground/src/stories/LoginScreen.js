import React, { useState } from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import {
  Container,
  TextInput,
  Button,
  Text,
  KeyboardAvoidingView,
  useTheme,
} from 'rn-hero-design';

const LoginScreen = ({ navigation }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('toan.nguyen@employmenthero.com');
  const [password, setPassword] = useState('12345678');
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.variables.DARK_PRIMARY_COLOR,
      }}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <Container style={{ paddingHorizontal: theme.variables.LARGE_SIZE }}>
          <Image
            source={require('../images/login_logo.png')}
            resizeMode="contain"
            style={{
              height: 100,
              marginVertical: theme.variables.LARGE_SIZE * 3,
              alignSelf: 'center',
            }}
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            labelStyle={{ color: theme.variables.INVERTED_TEXT_COLOR }}
            iconStyle={{ color: theme.variables.INVERTED_TEXT_COLOR }}
            inputStyle={{
              color: theme.variables.INVERTED_TEXT_COLOR,
              borderBottomColor: theme.variables.FOCUS_BLUE_3,
            }}
          />

          <TextInput
            label="Password"
            value={password}
            rightIcon={
              visiblePassword ? 'eye-invisible-outline' : 'eye-outline'
            }
            onChangeText={(value) => setPassword(value)}
            onPressIcon={() => setVisiblePassword(!visiblePassword)}
            secureTextEntry={!visiblePassword}
            wrapperStyle={{ marginBottom: theme.variables.LARGE_SIZE }}
            labelStyle={{ color: theme.variables.INVERTED_TEXT_COLOR }}
            iconStyle={{ color: theme.variables.INVERTED_TEXT_COLOR }}
            inputStyle={{
              color: theme.variables.INVERTED_TEXT_COLOR,
              borderBottomColor: theme.variables.FOCUS_BLUE_3,
            }}
          />

          <Button
            text="Log In"
            onPress={() => navigation.goBack()}
            wrapperStyle={{ marginBottom: theme.variables.LARGE_SIZE }}
          />

          <Text
            size="h5"
            color={theme.variables.INVERTED_TEXT_COLOR}
            style={{
              marginBottom: theme.variables.MEDIUM_SIZE,
              textAlign: 'center',
            }}>
            Email me a magic login link
          </Text>

          <Text
            size="h5"
            color={theme.variables.INVERTED_TEXT_COLOR}
            style={{
              marginBottom: theme.variables.MEDIUM_SIZE,
              textAlign: 'center',
            }}>
            Selected region:{' '}
            <Text
              size="h5"
              weight="bold"
              color={theme.variables.INVERTED_TEXT_COLOR}
              style={{
                textDecorationLine: 'underline',
              }}>
              Australia
            </Text>
          </Text>
        </Container>

        <View style={{ flex: 1 }} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
