import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MentionTextInput, {
  arrayInsertAt,
  stringReplace,
  deserialize,
  serialize,
  getAffectedMentionIndexes,
} from '../MentionTextInput.bs';
import { fireEvent, render, wait } from '@testing-library/react-native';

describe('MentionTextInput', () => {
  describe('Functionality', () => {
    const Example = ({ logger = () => {} }) => {
      const [value, setValue] = React.useState([]);

      logger(value);

      return (
        <MentionTextInput
          testID="my-mention-text-input"
          value={value}
          onChange={value => setValue(value)}
          renderSuggestionList={(searchValue, onSelect) => (
            <View testID="suggestion-list">
              <Text testID="search-value">{searchValue}</Text>
              <TouchableOpacity
                testID="suggestion-item"
                onPress={() => onSelect('999', 'Gia Toan')}
              />
            </View>
          )}
        />
      );
    };

    it('shows the suggestion list when users press @', async () => {
      const { getByTestId, queryByTestId } = render(<Example />);

      const mentionTextInput = getByTestId('my-mention-text-input');
      fireTypeEvent(mentionTextInput, 'Hello, @toan');

      await wait(() => expect(queryByTestId('suggestion-list')).toBeTruthy());
      expect(getByTestId('search-value').props.children).toBe('toan');
    });

    it('hides the suggestion list when users press space', async () => {
      const { getByTestId, queryByTestId } = render(<Example />);

      const mentionTextInput = getByTestId('my-mention-text-input');
      fireTypeEvent(mentionTextInput, 'Hello, @toan ');

      await wait(() => expect(queryByTestId('suggestion-list')).toBeFalsy());
    });

    it('hides the suggestion list when users change selection', async () => {
      const { getByTestId, queryByTestId } = render(<Example />);

      const mentionTextInput = getByTestId('my-mention-text-input');
      fireTypeEvent(mentionTextInput, 'Hello, @toan');

      await wait(() => expect(queryByTestId('suggestion-list')).toBeTruthy());

      fireEvent.selectionChange(mentionTextInput, {
        nativeEvent: {
          selection: {
            start: 0,
            end: 0,
          },
        },
      });

      expect(queryByTestId('suggestion-list')).toBeFalsy();
    });

    it('updates value when users press a suggestion item', async () => {
      const logger = jest.fn();
      const { getByTestId, queryByTestId } = render(
        <Example logger={logger} />,
      );

      const mentionTextInput = getByTestId('my-mention-text-input');
      fireTypeEvent(mentionTextInput, 'Hello, @toan');

      const suggestionItem = getByTestId('suggestion-item');
      fireEvent.press(suggestionItem);

      // pressing an item triggers selectionChange
      fireEvent.selectionChange(mentionTextInput, {
        nativeEvent: {
          selection: {
            start: 999,
            end: 999,
          },
        },
      });

      expect(queryByTestId('suggestion-list')).toBeFalsy();
      expect(logger).lastCalledWith([
        { ref: undefined, text: 'Hello, ' },
        { ref: '999', text: '@Gia Toan' },
        { ref: undefined, text: ' ' },
      ]);
    });
  });

  describe('Snapshot', () => {
    const noop = () => {};
    const value = [
      { ref: undefined, text: 'Hello, ' },
      { ref: '999', text: '@Gia Toan' },
    ];

    it.each`
      element
      ${<MentionTextInput value={value} onPress={noop} />}
      ${<MentionTextInput value={value} onPress={noop} disabled />}
    `('renders correctly', ({ element }) => {
      const { baseElement } = render(element);
      expect(baseElement).toMatchSnapshot();
    });
  });
});

describe('Helpers', () => {
  describe('arrayInsertAt', () => {
    it('works properly', () => {
      expect(arrayInsertAt(2, 'c', ['a', 'b', 'd', 'e'])).toEqual([
        'a',
        'b',
        'c',
        'd',
        'e',
      ]);
    });
  });

  describe('stringReplace', () => {
    it('works properly', () => {
      expect(stringReplace(2, 4, 'c', 'abdef')).toEqual('abcf');
    });
  });

  describe('deserialize', () => {
    it('works properly', () => {
      expect(
        deserialize([
          { text: 'Test ' },
          { text: '@Toan', ref: '1' },
          { text: ' and ' },
          { text: '@Hieu', ref: '2' },
        ]),
      ).toEqual([
        'Test @Toan and @Hieu',
        [
          { id: '1', name: '@Toan', offset: [5, 11] },
          { id: '2', name: '@Hieu', offset: [15, 21] },
        ],
      ]);
    });
  });

  describe('serialize', () => {
    it('works properly', () => {
      expect(
        serialize('@Toan, @Hieu and @ReasonML', [
          { id: '1', name: '@Toan', offset: [0, 6] },
          { id: '2', name: '@Hieu', offset: [7, 13] },
          { id: '3', name: '@ReasonML', offset: [17, 27] },
        ]),
      ).toEqual([
        { text: '', ref: undefined },
        { text: '@Toan', ref: '1' },
        { text: ', ', ref: undefined },
        { text: '@Hieu', ref: '2' },
        { text: ' and ', ref: undefined },
        { text: '@ReasonML', ref: '3' },
        { text: '', ref: undefined },
      ]);

      expect(
        serialize('@Toan@Hieu@ReasonML', [
          { id: '1', name: '@Toan', offset: [0, 6] },
          { id: '2', name: '@Hieu', offset: [5, 11] },
          { id: '3', name: '@ReasonML', offset: [10, 20] },
        ]),
      ).toEqual([
        { text: '', ref: undefined },
        { text: '@Toan', ref: '1' },
        { text: '', ref: undefined },
        { text: '@Hieu', ref: '2' },
        { text: '', ref: undefined },
        { text: '@ReasonML', ref: '3' },
        { text: '', ref: undefined },
      ]);
    });
  });

  describe('getAffectedMentionIndexes', () => {
    let mentions = [
      { id: '1', name: '@Toan', offset: [0, 6] },
      { id: '2', name: '@Hieu', offset: [7, 13] },
      { id: '3', name: '@ReasonML', offset: [17, 27] },
    ];

    it.each`
      selection   | result
      ${[0, 0]}   | ${[[], [0, 1, 2]]}
      ${[1, 1]}   | ${[[0], [1, 2]]}
      ${[5, 6]}   | ${[[0], [1, 2]]}
      ${[6, 6]}   | ${[[], [1, 2]]}
      ${[13, 17]} | ${[[], [2]]}
      ${[5, 8]}   | ${[[0, 1], [2]]}
      ${[99, 99]} | ${[[], []]}
    `('works properly', ({ selection, result }) => {
      expect(getAffectedMentionIndexes(selection, mentions)).toEqual(result);
    });
  });
});

const fireTypeEvent = (element, text = '') => {
  let value = '';
  let position = 0;

  text.split('').forEach(char_ => {
    value = value + char_;
    position = position + 1;

    fireEvent.changeText(element, value);
    fireEvent.selectionChange(element, {
      nativeEvent: {
        selection: {
          start: position,
          end: position,
        },
      },
    });
    fireEvent.keyPress(element, {
      nativeEvent: {
        key: char_,
      },
    });
  });
};
