import React, { useState, useRef } from 'react';
import { View, Switch, Text, TextInput, StyleSheet } from 'react-native';
import {
  ReBottomButton,
  KeyboardAvoidingView,
  Container,
} from 'rn-hero-design';
import legacyTheme from 'rn-hero-design/src/themes/legacy';

const noop = () => {};

const ReBottomButtonScreen = () => {
  const [useLegacy, setUseLegacy] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const input = useRef(null);

  return (
    <KeyboardAvoidingView withNavigation style={styles.keyboardAvoidingView}>
      <Container fluid>
        <View style={styles.configRow}>
          <Text style={styles.configText}>Use legacy theme</Text>
          <Switch
            value={useLegacy}
            onValueChange={value => setUseLegacy(value)}
          />
        </View>

        <View style={styles.configRow}>
          <Text style={styles.configText}>Show keyboard</Text>
          <Switch
            value={showKeyboard}
            onValueChange={value => {
              value ? input.current.focus() : input.current.blur();
              setShowKeyboard(value);
            }}
          />
        </View>

        <TextInput ref={input} style={styles.input} />
      </Container>

      <ReBottomButton
        text="🐪 Bottom Button"
        onPress={noop}
        theme={useLegacy ? legacyTheme : undefined}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  configRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  configText: {
    fontSize: 16,
  },
  input: {
    width: 1,
    height: 1,
    opacity: 0,
  },
});

export default ReBottomButtonScreen;
