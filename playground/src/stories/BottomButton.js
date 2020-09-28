import React, { useState, useRef } from 'react';
import { View, TextInput } from 'react-native';
import {
  BottomButton,
  KeyboardAvoidingView,
  Switch,
  ListItem,
} from 'rn-hero-design';
import legacyTheme from 'rn-hero-design/src/themes/legacy/Legacy_Theme.bs';

const noop = () => {};

const BottomButtonScreen = () => {
  const [useLegacy, setUseLegacy] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const input = useRef(null);

  return (
    <KeyboardAvoidingView withNavigation style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ListItem
          title="Use legacy theme"
          rightElement={
            <Switch
              value={useLegacy}
              onValueChange={(value) => setUseLegacy(value)}
            />
          }
          wrapperStyle={{ minHeight: 0 }}
        />

        <ListItem
          title="Show keyboard"
          rightElement={
            <Switch
              value={showKeyboard}
              onValueChange={(value) => {
                value ? input.current.focus() : input.current.blur();
                setShowKeyboard(value);
              }}
            />
          }
          wrapperStyle={{ minHeight: 0 }}
        />

        <TextInput
          ref={input}
          style={{
            width: 1,
            height: 1,
            opacity: 0,
          }}
        />
      </View>

      <BottomButton
        text="Bottom Button"
        onPress={noop}
        theme={useLegacy ? legacyTheme : undefined}
      />
    </KeyboardAvoidingView>
  );
};

export default BottomButtonScreen;
