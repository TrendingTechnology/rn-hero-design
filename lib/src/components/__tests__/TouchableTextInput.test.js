import React from 'react';
import TouchableTextInput from '../TouchableTextInput.gen';
import renderer from 'react-test-renderer';

describe('TextInput', () => {
  it.each`
    element
    ${<TouchableTextInput value="" onChangeText={() => {}} label="" />}
    ${<TouchableTextInput value="" onChangeText={() => {}} label="Email" />}
    ${<TouchableTextInput value="" onChangeText={() => {}} label="Email" rightIcon="email" />}
    ${<TouchableTextInput value="" onChangeText={() => {}} label="Email" rightIcon="email" disabled />}
    ${<TouchableTextInput value="" onChangeText={() => {}} label="Email" rightIcon="email" disabled error="error" />}
  `('renders correctly', ({ element }) => {
    const tree = renderer.create(element).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it.each`
    element
    ${<TouchableTextInput value="kienhiepsi" keyboardType="name-phone-pad" />}
    ${<TouchableTextInput value="kienhiepsi" keyboardType="web-search" />}
    ${<TouchableTextInput value="kienhiepsi" keyboardType="number-pad" />}
    ${<TouchableTextInput value="kienhiepsi" keyboardType="decimal-pad" />}
    ${<TouchableTextInput value="kienhiepsi" keyboardType="phone-pad" />}
    ${<TouchableTextInput value="kienhiepsi" keyboardType="ascii-capable" />}
    ${<TouchableTextInput value="kienhiepsi" keyboardType="numbers-and-punctuation" />}
    ${<TouchableTextInput value="kienhiepsi" keyboardType="visible-password" />}
  `('renders keyboardType correctly', ({ element }) => {
    const tree = renderer.create(element).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
