import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { getInset } from 'react-native-safe-area-view';

// margin theme
const bottomMargin = 16; // legacy = 0
const horizontalMargin = 16; // legacy = 0

const BottomButton = props => {
  const { width, height } = Dimensions.get('window');
  const isLandscape = width > height;
  const bottomPadding = getInset('bottom', isLandscape);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'red',
        marginBottom: bottomPadding > 0 ? 0 : bottomMargin,
        marginHorizontal: horizontalMargin,
      }}
    >
      <View
        style={{
          marginBottom: bottomPadding,
          backgroundColor: 'grey',
        }}
      >
        <View style={{ backgroundColor: 'gold', padding: 16 }}>
          <Text>Button</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BottomButton;
