import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { fireEvent, render, act } from '@testing-library/react-native';
import TabBar from '../TabBar.gen';

describe('TabBar', () => {
  jest.useFakeTimers();

  const LazyView = ({ content }) => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    });

    return isLoading ? (
      <ActivityIndicator accessibilityHint="loading" size="large" />
    ) : (
      <Text>{content}</Text>
    );
  };

  const Example = () => {
    let [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
      <TabBar
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <TabBar.Tab title={<Text>Tab 1</Text>}>
          <LazyView content="Content 1" />
        </TabBar.Tab>
        <TabBar.Tab title={<Text>Tab 2</Text>}>
          <LazyView content="Content 2" />
        </TabBar.Tab>
        <TabBar.Tab title={<Text>Tab 3</Text>}>
          <LazyView content="Content 3" />
        </TabBar.Tab>
      </TabBar>
    );
  };

  it('should load the first tab by default', () => {
    const { queryByText, queryByHintText } = render(<Example />);

    expect(queryByHintText('loading')).toBeTruthy();
    expect(queryByText('Content 1')).toBeFalsy();

    act(() => jest.runAllTimers());

    expect(queryByHintText('loading')).toBeFalsy();
    expect(queryByText('Content 1')).toBeTruthy();
    expect(queryByText('Content 2')).toBeFalsy();
    expect(queryByText('Content 3')).toBeFalsy();
  });

  it('should not load one tab twice', () => {
    const { queryByText, queryByHintText, getByText } = render(<Example />);

    act(() => jest.runAllTimers());

    fireEvent.press(getByText('Tab 2'));

    expect(queryByHintText('loading')).toBeTruthy();
    expect(queryByText('Content 2')).toBeFalsy();

    act(() => jest.runAllTimers());

    expect(queryByHintText('loading')).toBeFalsy();
    expect(queryByText('Content 1')).toBeTruthy();
    expect(queryByText('Content 2')).toBeTruthy();
    expect(queryByText('Content 3')).toBeFalsy();

    fireEvent.press(getByText('Tab 1'));

    expect(queryByHintText('loading')).toBeFalsy();
  });
});
