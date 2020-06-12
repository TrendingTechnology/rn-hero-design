import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const RichTextEditor = () => (
  <View style={{ flex: 1 }}>
    <WebView
      originWhitelist={['*']}
      source={{ html: '<h1>This is a static HTML source!</h1>' }}
    />
  </View>
);

export default RichTextEditor;
