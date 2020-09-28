import React from 'react';
import { Alert, ScrollView } from 'react-native';
import { Button, injectTheme } from 'rn-hero-design';

const callback = () => Alert.alert('Button clicked!');

const ButtonScreen = ({ theme }) => (
  <ScrollView contentContainerStyle={{ padding: theme.variables.MEDIUM_SIZE }}>
    <Button
      text="Filled Button"
      onPress={callback}
      wrapperStyle={{ marginBottom: theme.variables.MEDIUM_SIZE }}
    />
    <Button
      text="Loading Filled Button"
      onPress={callback}
      loading
      wrapperStyle={{ marginBottom: theme.variables.MEDIUM_SIZE }}
    />
    <Button
      text="Disabled Filled Button"
      onPress={callback}
      disabled
      wrapperStyle={{ marginBottom: theme.variables.MEDIUM_SIZE }}
    />

    <Button
      variant="outlined"
      text="Outlined Button"
      onPress={callback}
      wrapperStyle={{ marginBottom: theme.variables.MEDIUM_SIZE }}
    />
    <Button
      variant="outlined"
      text="Loading Outlined Button"
      onPress={callback}
      loading
      wrapperStyle={{ marginBottom: theme.variables.MEDIUM_SIZE }}
    />
    <Button
      variant="outlined"
      text="Disabled Outlined Button"
      onPress={callback}
      disabled
      wrapperStyle={{ marginBottom: theme.variables.MEDIUM_SIZE }}
    />

    <Button
      text="Custom Button"
      onPress={callback}
      wrapperStyle={{
        marginBottom: theme.variables.MEDIUM_SIZE,
        backgroundColor: 'tomato',
        borderRadius: theme.variables.SMALL_SIZE,
      }}
    />
  </ScrollView>
);

export default injectTheme(ButtonScreen);
