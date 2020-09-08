/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'rn-hero-design';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore((state) => state, { __theme: undefined });

const App = () => (
  <Provider store={store}>
    <View>
      <Text>Hello</Text>
      <Button text="PRESS ME" />
    </View>
  </Provider>
);

export default App;
