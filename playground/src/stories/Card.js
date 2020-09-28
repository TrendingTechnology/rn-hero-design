import React from 'react';
import { ScrollView } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Card, Container, Text, Icon, injectTheme } from 'rn-hero-design';

const CardScreen = ({ theme }) => (
  <ScrollView
    style={{ backgroundColor: theme.variables.GREY_5 }}
    contentContainerStyle={{ padding: theme.variables.SMALL_SIZE }}>
    <SafeAreaView forceInset={{ bottom: 'always' }}>
      <StyledCard>
        <Container>
          <Text size="h3">Employment Hero Pty Ltd</Text>
        </Container>
        <Container style={{ paddingTop: 0 }}>
          <Text size="h2">Welcome, Toan Nguyen</Text>
        </Container>
      </StyledCard>

      <StyledCard>
        <CardHeader>
          <Text size="h3">Goals</Text>
          <Icon icon="more-vertical" size={16} color={theme.variables.GREY_4} />
        </CardHeader>
        <CardContent>
          <Icon
            icon="target-outline"
            color={theme.variables.PRIMARY_COLOR}
            size={48}
            wrapperStyle={{ marginBottom: theme.variables.MEDIUM_SIZE }}
          />
          <Text>You do not have any goal to view</Text>
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardHeader>
          <Text size="h3">My Policies</Text>
          <Icon icon="more-vertical" size={16} color={theme.variables.GREY_4} />
        </CardHeader>
        <CardContent>
          <Text>You have</Text>
          <StyledNumber>3</StyledNumber>
          <Text>policies to acknowledge</Text>
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardHeader>
          <Text size="h3">My Certifications</Text>
          <Icon icon="more-vertical" size={16} color={theme.variables.GREY_4} />
        </CardHeader>
        <CardContent>
          <Text>You have</Text>
          <StyledNumber>1</StyledNumber>
          <Text>certifications to update</Text>
        </CardContent>
      </StyledCard>
    </SafeAreaView>
  </ScrollView>
);

const CardContent = ({ ...props }) => (
  <Container {...props} style={{ alignItems: 'center' }} />
);

const CardHeader = ({ ...props }) => (
  <Container
    {...props}
    direction="row"
    style={{ alignItems: 'center', justifyContent: 'space-between' }}
  />
);

const StyledCard = injectTheme(({ theme, ...props }) => (
  <Card
    {...props}
    style={{
      marginBottom: theme.variables.SMALL_SIZE,
      backgroundColor: 'white',
    }}
  />
));

const StyledNumber = injectTheme(({ theme, ...props }) => (
  <Text
    {...props}
    style={{
      marginVertical: theme.variables.SMALL_SIZE,
      fontSize: theme.variables.FONT_SIZE * 3,
      fontWeight: '400',
      color: theme.variables.ORANGE,
    }}
  />
));

export default injectTheme(CardScreen);
