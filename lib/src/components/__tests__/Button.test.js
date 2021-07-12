import React from 'react';
import Button from '../Button.gen';
import { fireEvent, render } from '@testing-library/react-native';

describe('Button', () => {
  it.each`
    element
    ${<Button text="Button" onPress={() => {}} />}
    ${<Button text="Button" onPress={() => {}} disabled />}
    ${<Button text="Button" onPress={() => {}} loading />}
    ${<Button text="Button" onPress={() => {}} variant="outlined" />}
  `('renders correctly', async ({ element }) => {
    const { baseElement } = render(element);
    expect(baseElement).toMatchSnapshot();
  });

  it('should feedback when users press', async () => {
    const callback = jest.fn();
    const { getByText } = render(<Button text="Tap here" onPress={callback} />);

    const button = getByText('Tap here');
    fireEvent.press(button);
    expect(callback).toBeCalledTimes(1);
  });

  it('should not feedback when disabled', async () => {
    const callback = jest.fn();
    const { getByText } = render(
      <Button disabled text="Tap here" onPress={callback} />,
    );

    const button = getByText('Tap here');
    fireEvent.press(button);
    expect(callback).toBeCalledTimes(0);
  });
});
