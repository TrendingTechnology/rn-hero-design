import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import routes from './stories/routes';

const menuData = Object.keys(routes).map(route => ({
  title: routes[route].navigationOptions.title || route,
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
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.itemText}>{title}</Text>
  </TouchableOpacity>
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
    initialRouteName: 'BottomButton',
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 16,
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default createAppContainer(AppNavigator);
