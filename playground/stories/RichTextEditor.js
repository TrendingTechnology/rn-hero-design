import React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  Text,
  Container,
  Avatar,
  RichTextEditor,
  ListItem,
  TextInput,
  KeyboardAvoidingView,
  injectTheme,
} from 'rn-hero-design';
import heroTheme from 'rn-hero-design/src/themes/hero/Hero_Variables.bs';

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

const noop = () => {};

const isEmpty = array => array.length === 0;

const getAcronym = string => string.match(/\b\w/g).join('');

const RichTextEditorScreen = ({ theme }) => {
  const scrollView = React.useRef(null);
  const editorLayout = React.useRef(null);
  const scrollLayout = React.useRef(null);
  const contentOffset = React.useRef({ x: 0, y: 0 });

  return (
    <KeyboardAvoidingView withNavigation style={styles.keyboardAvoidingView}>
      <ScrollView
        ref={scrollView}
        scrollEventThrottle={100}
        onScroll={event => {
          contentOffset.current = event.nativeEvent.contentOffset;
        }}
        onLayout={event => {
          scrollLayout.current = event.nativeEvent.layout;
        }}
        contentContainerStyle={styles.container}
      >
        <ListItem
          title="Toan Nguyen"
          leftElement={
            <Avatar
              size="small"
              title="TN"
              wrapperStyle={{ marginRight: theme.variables.MEDIUM_SIZE }}
            />
          }
          wrapperStyle={{
            minHeight: 0,
            paddingVertical: 0,
            paddingHorizontal: 0,
            borderBottomWidth: 0,
          }}
        />

        <TouchableOpacity onPress={noop}>
          <View pointerEvents="none">
            <TextInput
              rightIcon="eye-outline"
              value="Share to everyone"
              onChangeText={noop}
              errorStyle={{ display: 'none' }}
            />
          </View>
        </TouchableOpacity>

        <View
          onLayout={event => {
            editorLayout.current = event.nativeEvent.layout;
          }}
        >
          <RichTextEditor
            name="test"
            placeholder="What's on your mind..."
            initialValue={[
              {
                type: 'paragraph',
                children: [{ text: '' }],
              },
            ]}
            onChange={() => {}}
            onCursorChange={({ position }) => {
              let editorLayout_ = editorLayout.current;
              const scrollLayout_ = scrollLayout.current;
              const contentOffset_ = contentOffset.current;

              if (editorLayout_ && scrollLayout_) {
                const scrollTop = contentOffset_.y;
                const scrollBottom = scrollTop + scrollLayout_.height;
                const cursorTop = editorLayout_.y + position.top;

                if (cursorTop < scrollTop || cursorTop > scrollBottom) {
                  scrollView.current.scrollTo({
                    x: 0,
                    y: cursorTop,
                    animated: true,
                  });
                }
              }
            }}
          />
        </View>

        <Image
          source={{
            uri:
              'https://www.nintendo.com/content/dam/noa/en_US/games/switch/p/pokemon-cafe-mix-switch/pokemon-cafe-mix-switch-hero.jpg',
          }}
          resizeMode="cover"
          style={{
            height: 300,
            marginBottom: theme.variables.MEDIUM_SIZE,
            borderRadius: theme.variables.SMALL_SIZE,
          }}
        />

        <Image
          source={{
            uri:
              'https://www.nintendo.com/content/dam/noa/en_US/games/switch/s/super-mario-maker-2-switch/super-mario-maker-2-switch-hero.jpg',
          }}
          resizeMode="cover"
          style={{ height: 300, borderRadius: theme.variables.SMALL_SIZE }}
        />
      </ScrollView>

      <RichTextEditor.MentionList
        name="test"
        render={(searchValue, onSelect) => (
          <SuggestionList searchValue={searchValue} onSelect={onSelect} />
        )}
      />
      <RichTextEditor.Toolbar name="test" />
    </KeyboardAvoidingView>
  );
};

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
  container: {
    padding: 16,
    // backgroundColor: '#ccc',
  },
});

RichTextEditorScreen.navigationOptions = {
  title: 'New Announcement',
  headerStyle: {
    backgroundColor: heroTheme.FOCUS_BLUE_1,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    color: heroTheme.WHITE,
  },
};

export default injectTheme(RichTextEditorScreen);
