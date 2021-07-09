import React from 'react';
import DateTimePicker from '../DateTimePicker.gen';
import renderer from 'react-test-renderer';
import * as ReactNative from 'react-native';

jest.mock('react-native/Libraries/Components/Keyboard/Keyboard', () => ({
  addListener: jest.fn(),
  dismiss: jest.fn(),
}));
describe('DateTimePicker', () => {
  it.each`
    element
    ${<DateTimePicker show={true} />}
    ${<DateTimePicker show={false} />}
    ${<DateTimePicker show={true} mode="date" />}
    ${<DateTimePicker show={true} mode="time" />}
  `('renders correctly', ({ element }) => {
    const tree = renderer.create(element).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
