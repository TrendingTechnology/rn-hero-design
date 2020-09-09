import React from 'react';
import { View } from 'react-native';
import {
  Avatar,
  Container,
  Text,
  ListItem,
  Icon,
  injectTheme,
} from 'rn-hero-design';
import { FOCUS_BLUE_1, WHITE } from 'rn-hero-design/src/themes/hero/variables';

const ProfileScreen = ({ theme }) => (
  <View>
    <Container
      style={{
        alignItems: 'center',
        marginBottom: theme.variables.LARGE_SIZE,
      }}
    >
      <Avatar
        size="large"
        title="TN"
        wrapperStyle={{ marginVertical: theme.variables.MEDIUM_SIZE }}
      />
      <Text size="h1" style={{ marginBottom: theme.variables.SMALL_SIZE }}>
        Toan Nguyen
      </Text>
      <Text size="h3" color={theme.variables.MUTED_TEXT_COLOR}>
        Software Engineer
      </Text>
    </Container>

    <Container style={{ paddingTop: 0 }}>
      <ListItem
        title="Organisations"
        rightElement={
          <Icon
            icon="single-right-outline"
            color={theme.variables.MUTED_TEXT_COLOR}
            size={16}
          />
        }
        titleStyle={{ fontWeight: '400' }}
        wrapperStyle={{ minHeight: 0, paddingHorizontal: 0 }}
      />
      <ListItem
        title="My Profile"
        rightElement={
          <Icon
            icon="single-right-outline"
            color={theme.variables.MUTED_TEXT_COLOR}
            size={16}
          />
        }
        titleStyle={{ fontWeight: '400' }}
        wrapperStyle={{ minHeight: 0, paddingHorizontal: 0 }}
      />
      <ListItem
        title="Payment Summaries"
        rightElement={
          <Icon
            icon="single-right-outline"
            color={theme.variables.MUTED_TEXT_COLOR}
            size={16}
          />
        }
        titleStyle={{ fontWeight: '400' }}
        wrapperStyle={{ minHeight: 0, paddingHorizontal: 0 }}
      />
      <ListItem
        title="Settings"
        rightElement={
          <Icon
            icon="single-right-outline"
            color={theme.variables.MUTED_TEXT_COLOR}
            size={16}
          />
        }
        titleStyle={{ fontWeight: '400' }}
        wrapperStyle={{ minHeight: 0, paddingHorizontal: 0 }}
      />
      <ListItem
        title="Change Region"
        rightElement={
          <Icon
            icon="single-right-outline"
            color={theme.variables.MUTED_TEXT_COLOR}
            size={16}
          />
        }
        titleStyle={{ fontWeight: '400' }}
        wrapperStyle={{ minHeight: 0, paddingHorizontal: 0 }}
      />
      <ListItem
        title="Logout"
        rightElement={
          <Icon
            icon="single-right-outline"
            color={theme.variables.MUTED_TEXT_COLOR}
            size={16}
          />
        }
        titleStyle={{ fontWeight: '400', color: theme.variables.PRIMARY_COLOR }}
        wrapperStyle={{ minHeight: 0, paddingHorizontal: 0 }}
      />
    </Container>
  </View>
);

ProfileScreen.navigationOptions = {
  title: 'Profile',
  headerStyle: {
    backgroundColor: FOCUS_BLUE_1,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    color: WHITE,
  },
};

export default injectTheme(ProfileScreen);
