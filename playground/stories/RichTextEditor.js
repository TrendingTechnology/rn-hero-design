import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Text,
  Container,
  Avatar,
  RichTextEditor,
  KeyboardAvoidingView,
  injectTheme,
} from 'rn-hero-design';

const suggestionData = [
  { id: '1', name: 'Tuan Mai', job: 'Team leader' },
  {
    id: '2',
    name: 'Huy Vo',
    job: 'Bug creator',
    avatar: 'https://avatars0.githubusercontent.com/u/17645203?s=400&v=4',
  },
  { id: '3', name: 'Gia Toan', job: 'Mobile developer' },
  { id: '4', name: 'Kien Tran', job: 'Mobile developer' },
  { id: '5', name: 'Hieu Pham', job: 'Web developer' },
  {
    id: '6',
    name: 'ReasonML',
    job: 'Functional language',
    avatar: 'https://avatars3.githubusercontent.com/u/20414525?s=400&v=4',
  },
];

const isEmpty = array => array.length === 0;

const getAcronym = string => string.match(/\b\w/g).join('');

const RichTextEditorScreen = () => (
  <KeyboardAvoidingView withNavigation style={styles.keyboardAvoidingView}>
    <RichTextEditor
      placeholder="What's on your mind..."
      initialValue={[
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ]}
      onChange={() => {}}
      renderSuggestionList={(searchValue, onSelect) => (
        <SuggestionList searchValue={searchValue} onSelect={onSelect} />
      )}
    />
  </KeyboardAvoidingView>
);

const SuggestionList = injectTheme(({ searchValue, onSelect, theme }) => {
  const searchResult = suggestionData.filter(({ name }) =>
    name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  if (isEmpty(searchResult)) {
    return (
      <Container
        direction="row"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: theme.variables.LARGE_SIZE + theme.variables.SMALL_SIZE * 2,
          paddingVertical: 0,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: theme.variables.BORDER_COLOR,
        }}
      >
        <Text weight="500">No result 😕</Text>
      </Container>
    );
  }

  return (
    <FlatList
      keyboardShouldPersistTaps="handled"
      data={searchResult}
      keyExtractor={item => item.id}
      renderItem={({ item: { id, name, job, avatar } }) => (
        <SuggestionItem
          name={name}
          job={job}
          avatar={avatar}
          onPress={() => onSelect(id, name)}
        />
      )}
    />
  );
});

const SuggestionItem = injectTheme(({ name, job, avatar, onPress, theme }) => (
  <TouchableOpacity onPress={onPress}>
    <Container
      direction="row"
      style={{
        alignItems: 'center',
        paddingVertical: theme.variables.SMALL_SIZE,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: theme.variables.BORDER_COLOR,
      }}
    >
      <Avatar
        size="small"
        title={getAcronym(name)}
        source={avatar}
        wrapperStyle={{ marginRight: theme.variables.MEDIUM_SIZE }}
      />
      <Text weight="500" style={{ marginRight: theme.variables.MEDIUM_SIZE }}>
        {name}
      </Text>
      <Text weight="500" color={theme.variables.MUTED_TEXT_COLOR}>
        {job}
      </Text>
    </Container>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default RichTextEditorScreen;
