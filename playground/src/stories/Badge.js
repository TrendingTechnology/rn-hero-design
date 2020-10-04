import React from 'react';
import { Badge, Container, Text, injectTheme } from 'rn-hero-design';

const BadgeScreen = ({ theme }) => (
  <>
    <Container direction="row" style={{ alignItems: 'center' }}>
      <Text>Error badge </Text>
      <Badge variant="error" content="Error" />
    </Container>

    <Container direction="row" style={{ alignItems: 'center', paddingTop: 0 }}>
      <Text>Warning badge </Text>
      <Badge
        variant="warning"
        content="Warning"
        wrapperStyle={{ marginRight: theme.variables.SMALL_SIZE }}
      />
      <Badge variant="warning" content="Pending" />
    </Container>

    <Container direction="row" style={{ alignItems: 'center', paddingTop: 0 }}>
      <Text>Success badge </Text>
      <Badge variant="success" content="Success" />
    </Container>

    <Container direction="row" style={{ alignItems: 'center', paddingTop: 0 }}>
      <Text>Info badge </Text>
      <Badge variant="info" content="99+" />
    </Container>
  </>
);

export default injectTheme(BadgeScreen);
