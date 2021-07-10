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
    ${<DateTimePicker show={true} value={new Date('2021-08-09')} />}
    ${<DateTimePicker show={false} value={new Date('2021-08-09')} />}
    ${<DateTimePicker show={true} mode="date" value={new Date('2021-08-09')} />}
    ${<DateTimePicker show={true} mode="time" value={new Date('2021-08-09')} />}
  `('renders correctly', async ({ element }) => {
    const tree = renderer.create(element).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
