import React from 'react';
import TextInput from '../TextInput.gen';
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

  it.each`
    element
    ${<TextInput value="kienhiepsi" keyboardType="name-phone-pad" />}
    ${<TextInput value="kienhiepsi" keyboardType="web-search" />}
    ${<TextInput value="kienhiepsi" keyboardType="number-pad" />}
    ${<TextInput value="kienhiepsi" keyboardType="decimal-pad" />}
    ${<TextInput value="kienhiepsi" keyboardType="phone-pad" />}
    ${<TextInput value="kienhiepsi" keyboardType="ascii-capable" />}
    ${<TextInput value="kienhiepsi" keyboardType="numbers-and-punctuation" />}
    ${<TextInput value="kienhiepsi" keyboardType="visible-password" />}
  `('renders keyboardType correctly', ({ element }) => {
    const tree = renderer.create(element).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
