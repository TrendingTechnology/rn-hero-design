import React from 'react';
import { View } from 'react-native';
import {
  ReTabBar,
  ReText,
  Container,
  injectTheme,
  ReIcon,
} from 'rn-hero-design';

const TabBarScreen = ({ theme }) => {
  let [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <View>
      <ReTabBar
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        <ReTabBar.Tab
          title={
            <ReText
              weight="600"
              color={
                selectedIndex === 0
                  ? theme.variables.PRIMARY_COLOR
                  : theme.variables.TEXT_COLOR
              }
            >
              Tab 1
            </ReText>
          }
        >
          <Container>
            <ReText>Nhìn cũng ok</ReText>
          </Container>
        </ReTabBar.Tab>
        <ReTabBar.Tab
          title={
            <ReText
              weight="600"
              color={
                selectedIndex === 1
                  ? theme.variables.PRIMARY_COLOR
                  : theme.variables.TEXT_COLOR
              }
            >
              Tab 2
            </ReText>
          }
        >
          <Container>
            <ReText>Nhìn cũng được</ReText>
          </Container>
        </ReTabBar.Tab>
        <ReTabBar.Tab
          title={
            <ReIcon
              icon="email"
              size={24}
              color={
                selectedIndex === 2
                  ? theme.variables.PRIMARY_COLOR
                  : theme.variables.TEXT_COLOR
              }
            />
          }
        >
          <Container>
            <ReText>Nhìn cũng tạm</ReText>
          </Container>
        </ReTabBar.Tab>
      </ReTabBar>
    </View>
  );
};

export default injectTheme(TabBarScreen);
