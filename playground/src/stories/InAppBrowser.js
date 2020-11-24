import { View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { InAppBrowser, injectTheme } from 'rn-hero-design';

const A = ({ theme }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: 'yellow' }}>
      <InAppBrowser
        originWhitelist={['*']}
        source={{ uri: 'https://google.com.vn' }}
        style={{
          flex: 1,
          height: 300,
        }}
        onPressCancel={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default injectTheme(A);
