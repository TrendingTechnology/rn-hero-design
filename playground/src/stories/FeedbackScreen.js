import React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  YellowBox,
} from 'react-native';
import {
  Text,
  Container,
  Avatar,
  TextInput,
  KeyboardAvoidingView,
  MentionTextInput,
  BottomButton,
  Icon,
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

const noop = () => {};

const isEmpty = (message) => !message.map((block) => block.text).join();

const getAcronym = (string) => string.match(/\b\w/g).join('');

const FeedbackScreen = ({ theme }) => {
  const [value, setValue] = React.useState([]);
  const [isDirty, setIsDirty] = React.useState(false);

  // https://stackoverflow.com/questions/58243680/react-native-another-virtualizedlist-backed-container
  React.useEffect(() => {
    YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <>
      <KeyboardAvoidingView withNavigation style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: theme.variables.MEDIUM_SIZE }}>
          <TouchableOpacity onPress={noop}>
            <View pointerEvents="none">
              <TextInput
                rightIcon="user-outline"
                placeholder="Who is this feedback for?"
                value=""
                onChangeText={noop}
                errorStyle={{ display: 'none' }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={noop}>
            <View pointerEvents="none">
              <TextInput
                rightIcon="eye-outline"
                value="Share with Recipient's Managers"
                onChangeText={noop}
                errorStyle={{ display: 'none' }}
              />
            </View>
          </TouchableOpacity>

          <MentionTextInput
            placeholder="Your feedback"
            rightIcon="comment-outline"
            value={value}
            autoFocus
            error={isEmpty(value) && isDirty ? "Message can't be blank" : ''}
            onChange={(value) => {
              setValue(value);
              setIsDirty(true);
            }}
            renderSuggestionList={(searchValue, onSelect) => (
              <SuggestionList searchValue={searchValue} onSelect={onSelect} />
            )}
          />

          <View
            style={{
              flexDirection: 'row',
              marginBottom: theme.variables.MEDIUM_SIZE,
            }}>
            <Icon
              icon="paperclip"
              size={20}
              wrapperStyle={{ marginRight: theme.variables.MEDIUM_SIZE }}
            />
            <Icon icon="camera-outline" size={20} />
          </View>

          <Image
            source={{ uri: attachment1 }}
            resizeMode="cover"
            style={{
              height: 300,
              marginBottom: theme.variables.MEDIUM_SIZE,
              borderRadius: theme.variables.SMALL_SIZE,
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomButton text="Send" onPress={noop} disabled={isEmpty(value)} />
    </>
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
        }}>
        <Text size="h5" weight="500" color={theme.variables.MUTED_TEXT_COLOR}>
          No result
        </Text>
      </Container>
    );
  }

  return (
    <FlatList
      keyboardShouldPersistTaps="handled"
      data={searchResult}
      keyExtractor={(item) => item.id}
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
      }}>
      <Avatar
        size="small"
        title={getAcronym(name)}
        source={avatar}
        wrapperStyle={{ marginRight: theme.variables.SMALL_SIZE }}
      />
      <Text
        size="h5"
        weight="500"
        style={{ marginRight: theme.variables.SMALL_SIZE }}>
        {name}
      </Text>
      <Text size="h5" weight="500" color={theme.variables.MUTED_TEXT_COLOR}>
        {job}
      </Text>
    </Container>
  </TouchableOpacity>
));

const attachment1 =
  'https://c.files.bbci.co.uk/1FFA/production/_92468180_hi036228060-ap.jpg';

export default injectTheme(FeedbackScreen);
