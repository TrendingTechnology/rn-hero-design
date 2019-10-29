import React from 'react';
import { View, Button, FlatList, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import routes from './stories/routes';

const menuData = Object.keys(routes).map(route => ({
  title: routes[route].navigationOptions.title,
  route,
}));

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <FlatList
      data={menuData}
      renderItem={({ item }) => (
        <ListItem
          title={item.title}
          onPress={() => navigation.navigate(item.route)}
        />
      )}
      keyExtractor={item => item.title}
    />
  </View>
);

const ListItem = ({ title, onPress }) => (
  <View style={styles.item}>
    <Button title={title} onPress={onPress} />
  </View>
);

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: '👓 RN Hero Design',
      },
    },
    ...routes,
  },
  {
    initialRouteName: 'Home',
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default createAppContainer(AppNavigator);
