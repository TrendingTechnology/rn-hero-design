import React from 'react';
import { ScrollView } from 'react-native';
import { ListItem, Icon, Avatar, injectTheme } from 'rn-hero-design';

const noop = () => {};

const ListItemScreen = ({ theme }) => (
  <ScrollView>
    <ListItem title="Huy Vo" />
    <ListItem title="Huy Vo" subtitle="Bug creator" />
    <ListItem
      title="Huy Vo"
      subtitle="The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking."
      leftElement={
        <Avatar
          size="medium"
          title="HV"
          source="https://avatars0.githubusercontent.com/u/17645203?s=400&v=4"
          wrapperStyle={{ marginRight: theme.variables.MEDIUM_SIZE }}
        />
      }
    />

    <ListItem
      title="Huy Vo"
      onPress={noop}
      rightElement={
        <Icon icon="ok-circle" color={theme.variables.FOCUS_BLUE_1} />
      }
    />
    <ListItem
      title="Huy Vo"
      subtitle="Bug creator"
      onPress={noop}
      rightElement={
        <Icon icon="ok-circle" color={theme.variables.FOCUS_BLUE_1} />
      }
    />
    <ListItem
      title="Huy Vo"
      subtitle="The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking."
      onPress={noop}
      rightElement={
        <Icon
          icon="ok-circle"
          color={theme.variables.FOCUS_BLUE_1}
          wrapperStyle={{ marginLeft: theme.variables.MEDIUM_SIZE }}
        />
      }
      leftElement={
        <Avatar
          size="medium"
          title="HV"
          source="https://avatars0.githubusercontent.com/u/17645203?s=400&v=4"
          wrapperStyle={{ marginRight: theme.variables.MEDIUM_SIZE }}
        />
      }
    />

    <ListItem
      title="Huy Vo"
      onPress={noop}
      rightElement={
        <Icon icon="ok-circle" color={theme.variables.FOCUS_BLUE_1} />
      }
      wrapperStyle={{ minHeight: 0 }}
    />
  </ScrollView>
);

export default injectTheme(ListItemScreen);
