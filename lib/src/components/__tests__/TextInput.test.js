import React from 'react';
import TextInput from '../TextInput';
import renderer from 'react-test-renderer';

describe('TextInput', () => {
  it.each`
    element
    ${<TextInput value="" onChangeText={() => {}} label="" />}
    ${<TextInput value="" onChangeText={() => {}} label="Email" />}
    ${<TextInput value="" onChangeText={() => {}} label="Email" rightIcon="email" />}
    ${<TextInput value="" onChangeText={() => {}} label="Email" rightIcon="email" disabled />}
    ${<TextInput value="" onChangeText={() => {}} label="Email" rightIcon="email" disabled error="error" />}
  `('renders correctly', ({ element }) => {
    const tree = renderer.create(element).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
