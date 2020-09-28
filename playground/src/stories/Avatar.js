import React from 'react';
import { Avatar, Container, injectTheme } from 'rn-hero-design';

const AvatarScreen = ({ theme }) => (
  <Container>
    <Avatar
      size="small"
      title="HV"
      wrapperStyle={{ marginBottom: theme.variables.MEDIUM_SIZE }}
    />
    <Avatar
      size="small"
      title="HV"
      source="https://avatars0.githubusercontent.com/u/17645203?s=400&v=4"
      wrapperStyle={{ marginBottom: theme.variables.MEDIUM_SIZE }}
    />
    <Avatar
      size="medium"
      title="HV"
      wrapperStyle={{ marginBottom: theme.variables.MEDIUM_SIZE }}
    />
    <Avatar
      size="medium"
      title="HV"
      source="https://avatars0.githubusercontent.com/u/17645203?s=400&v=4"
      wrapperStyle={{ marginBottom: theme.variables.MEDIUM_SIZE }}
    />
    <Avatar
      size="large"
      title="HV"
      wrapperStyle={{ marginBottom: theme.variables.MEDIUM_SIZE }}
    />
    <Avatar
      size="large"
      title="HV"
      source="https://avatars0.githubusercontent.com/u/17645203?s=400&v=4"
      wrapperStyle={{ marginBottom: theme.variables.MEDIUM_SIZE }}
    />
  </Container>
);

export default injectTheme(AvatarScreen);
