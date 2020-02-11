import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  Container,
  MentionTextInput,
  ListItem,
  Avatar,
  TextInput,
  injectTheme,
  Text,
  KeyboardAvoidingView,
} from 'rn-hero-design';

const sampleValue = [
  {
    text: 'Test ',
  },
  {
    text: '@Gia Toan',
    id: 1,
  },
  {
    text: ' and ',
  },
  {
    text: '@Gia Toan',
    id: 1,
  },
  {
    text: ' and ',
  },
];

const MentionTextInputScreen = ({ theme }) => {
  const [value, setValue] = React.useState(sampleValue);

  return (
    <KeyboardAvoidingView
      withNavigation
      style={StyleSheet.flatten([
        styles.keyboardAvoidingView,
        { backgroundColor: theme.variables.BACKGROUND_COLOR },
      ])}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          padding: theme.variables.MEDIUM_SIZE,
        }}
      >
        <ListItem
          title="Huy Vo"
          subtitle="Bug creator"
          leftElement={
            <Avatar
              size="medium"
              title="HV"
              source="https://avatars0.githubusercontent.com/u/17645203?s=400&v=4"
              wrapperStyle={{
                marginRight: theme.variables.MEDIUM_SIZE,
              }}
            />
          }
          wrapperStyle={{ paddingHorizontal: 0, borderBottomWidth: 0 }}
        />

        <TouchableOpacity onPress={() => {}}>
          <View pointerEvents="none">
            <TextInput
              value="Share to everyone"
              rightIcon="eye-outline"
              onChangeText={() => {}}
              wrapperStyle={{ marginBottom: 0 }}
            />
          </View>
        </TouchableOpacity>

        <MentionTextInput
          value={value}
          onChange={value => setValue(value)}
          renderSuggestionList={(searchValue, onSelect) => {
            return (
              <FlatList
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                data={[
                  { id: 1, name: 'Gia Toan', job: 'Frontend developer' },
                  { id: 2, name: 'Huy Vo', job: 'Frontend developer' },
                  { id: 3, name: 'Tuan Mai', job: 'Frontend developer' },
                  { id: 4, name: 'Kien Tran', job: 'Frontend developer' },
                  { id: 5, name: 'Nam Vo', job: 'Frontend developer' },
                  { id: 6, name: 'Tuan Mai', job: 'Frontend developer' },
                ].filter(({ name }) =>
                  name.toLowerCase().includes(searchValue.toLowerCase()),
                )}
                keyExtractor={value => value.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => onSelect(item.id, item.name)}
                  >
                    <Container
                      direction="row"
                      style={{
                        alignItems: 'center',
                        paddingVertical: theme.variables.SMALL_SIZE,
                      }}
                    >
                      <Avatar
                        size="small"
                        title="HV"
                        wrapperStyle={{
                          marginRight: theme.variables.MEDIUM_SIZE,
                        }}
                      />
                      <Text
                        size="h5"
                        weight="500"
                        style={{ marginRight: theme.variables.MEDIUM_SIZE }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        size="h5"
                        weight="500"
                        color={theme.variables.MUTED_TEXT_COLOR}
                      >
                        {item.job}
                      </Text>
                    </Container>
                  </TouchableOpacity>
                )}
              />
            );
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default injectTheme(MentionTextInputScreen);
