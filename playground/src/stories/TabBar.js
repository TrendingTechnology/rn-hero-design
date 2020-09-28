import React from 'react';
import { ActivityIndicator } from 'react-native';
import { TabBar, Text, Container, injectTheme, Icon } from 'rn-hero-design';

const LazyView = ({ content }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  });

  return (
    <Container>
      {isLoading ? <ActivityIndicator size="large" /> : <Text>{content}</Text>}
    </Container>
  );
};

const TabBarScreen = ({ theme }) => {
  let [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TabBar
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
      contentStyle={{ backgroundColor: theme.variables.BACKGROUND_COLOR }}>
      <TabBar.Tab
        title={
          <Text
            weight="600"
            color={
              selectedIndex === 0
                ? theme.variables.PRIMARY_COLOR
                : theme.variables.TEXT_COLOR
            }>
            Tab 1
          </Text>
        }>
        <LazyView content="Look ok" />
      </TabBar.Tab>
      <TabBar.Tab
        title={
          <Text
            weight="600"
            color={
              selectedIndex === 1
                ? theme.variables.PRIMARY_COLOR
                : theme.variables.TEXT_COLOR
            }>
            Tab 2
          </Text>
        }>
        <LazyView content="Look fine" />
      </TabBar.Tab>
      <TabBar.Tab
        title={
          <Icon
            icon="email"
            size={24}
            color={
              selectedIndex === 2
                ? theme.variables.PRIMARY_COLOR
                : theme.variables.TEXT_COLOR
            }
          />
        }>
        <LazyView content="Look good" />
      </TabBar.Tab>
    </TabBar>
  );
};

export default injectTheme(TabBarScreen);
