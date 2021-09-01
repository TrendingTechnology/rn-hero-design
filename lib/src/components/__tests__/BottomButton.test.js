import React from 'react';
import BottomButton from '../BottomButton.gen';
import { fireEvent, render } from '@testing-library/react-native';

describe('BottomButton', () => {
  it.each`
    element
    ${(<BottomButton text="Button" onPress={() => {}} />)}
    ${(<BottomButton text="Button" onPress={() => {}} disabled />)}
    ${(<BottomButton text="Button" onPress={() => {}} loading />)}
    ${(<BottomButton text="Button" onPress={() => {}} forceInset="always" />)}
    ${(<BottomButton text="Button" onPress={() => {}} forceInset="never" />)}
  `('renders correctly', async ({ element }) => {
    const { baseElement } = render(element);
    expect(baseElement).toMatchSnapshot();
  });

  it('should feedback when users press', async () => {
    const callback = jest.fn();
    const { getByText } = render(
      <BottomButton text="Tap here" onPress={callback} />,
    );

    const button = getByText('Tap here');
    fireEvent.press(button);
    expect(callback).toBeCalledTimes(1);
  });

  it('should not feedback when disabled', async () => {
    const callback = jest.fn();
    const { getByText } = render(
      <BottomButton disabled text="Tap here" onPress={callback} />,
    );

    const button = getByText('Tap here');
    fireEvent.press(button);
    expect(callback).toBeCalledTimes(0);
  });
});
