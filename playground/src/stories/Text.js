import React from 'react';
import { ScrollView } from 'react-native';
import { Text, Container, injectTheme } from 'rn-hero-design';

const TextScreen = ({ theme }) => (
  <ScrollView>
    <Container>
      <Text size="h1" style={{ marginBottom: theme.variables.MEDIUM_SIZE }}>
        Text size h1
      </Text>

      <Text size="h2" style={{ marginBottom: theme.variables.MEDIUM_SIZE }}>
        Text size h2
      </Text>

      <Text size="h3" style={{ marginBottom: theme.variables.MEDIUM_SIZE }}>
        Text size h3
      </Text>

      <Text size="h4" style={{ marginBottom: theme.variables.MEDIUM_SIZE }}>
        Text size h4
      </Text>

      <Text size="h5" style={{ marginBottom: theme.variables.MEDIUM_SIZE }}>
        Text size h5
      </Text>

      <Text weight="500" style={{ marginBottom: theme.variables.MEDIUM_SIZE }}>
        Text weight 500
      </Text>

      <Text weight="600" style={{ marginBottom: theme.variables.MEDIUM_SIZE }}>
        Text weight 600
      </Text>

      <Text weight="700" style={{ marginBottom: theme.variables.MEDIUM_SIZE }}>
        Text weight 700
      </Text>

      <Text
        numberOfLines={1}
        ellipsizeMode="middle"
        style={{ marginBottom: theme.variables.MEDIUM_SIZE }}>
        Long paragraph, supports numberOfLines and ellipsizeMode
      </Text>
    </Container>
  </ScrollView>
);

export default injectTheme(TextScreen);
