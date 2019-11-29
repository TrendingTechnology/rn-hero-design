import React from 'react';
import { Text, Container } from 'rn-hero-design';

const TextScreen = () => (
  <Container>
    <Text size="h1" style={{ marginBottom: 16 }}>
      The quick brown fox
    </Text>
    <Text size="h2" style={{ marginBottom: 16 }}>
      The quick brown fox
    </Text>
    <Text size="h3" style={{ marginBottom: 16 }}>
      The quick brown fox
    </Text>
    <Text style={{ marginBottom: 16 }}>The quick brown fox</Text>
    <Text weight="500" style={{ marginBottom: 16 }}>
      The quick brown fox
    </Text>
    <Text weight="600" style={{ marginBottom: 16 }}>
      The quick brown fox
    </Text>
    <Text weight="700" style={{ marginBottom: 16 }}>
      The quick brown fox
    </Text>
  </Container>
);

export default TextScreen;
