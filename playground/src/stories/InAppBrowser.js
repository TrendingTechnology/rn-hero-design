import { Text, View } from 'react-native';
import React from 'react';

import { InAppBrowser, injectTheme } from 'rn-hero-design';

const A = ({ theme }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'yellow' }}>
      <InAppBrowser
        originWhitelist={['*']}
        source={{ uri: 'https://google.com.vn' }}
        style={{
          flex: 1,
          height: 300,
        }}
      />
    </View>
  );
};

export default injectTheme(A);
