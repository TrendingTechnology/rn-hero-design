import 'react-native-gesture-handler';
import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, FlatList } from 'react-native';
import { ListItem, Badge, injectTheme } from 'rn-hero-design';

import routes from './stories/routes';

const menuData = Object.keys(routes).map((name) => ({
  name: name,
  screen: routes[name].screen,
  options: routes[name].options,
  badge: routes[name].badge,
}));

const HomeScreen = injectTheme(({ navigation, theme }) => (
  <View style={{ flex: 1 }}>
    <FlatList
      data={menuData}
      renderItem={({ item }) => (
        <ListItem
          title={item.name}
          onPress={() => navigation.navigate(item.name)}
          leftElement={
            item.badge ? (
              <Badge
                variant="info"
                content={item.badge}
                wrapperStyle={{ marginRight: theme.variables.SMALL_SIZE }}
              />
            ) : null
          }
          wrapperStyle={{ minHeight: 0 }}
        />
      )}
      keyExtractor={(item) => item.name}
    />
  </View>
));

const Stack = createStackNavigator();

const App = injectTheme(({ theme }) => {
  const CustomTheme = React.useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: theme.variables.BACKGROUND_COLOR,
      },
    }),
    [theme.variables.BACKGROUND_COLOR],
  );

  return (
    <NavigationContainer theme={CustomTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'RN Hero Design' }}
        />
        {menuData.map(({ name, screen, options }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={screen}
            options={options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

const store = createStore((state) => state, { __theme: undefined });

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
