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
    ${<TouchableTextInput value="kienhiepsi" keyboardType="namePhonePad" />}
    ${<TouchableTextInput value="kienhiepsi" keyboardType="webSearch" />}
    ${<TouchableTextInput value="kienhiepsi" keyboardType="numberPad" />}
    ${<TouchableTextInput value="kienhiepsi" keyboardType="decimalPad" />}
    ${<TouchableTextInput value="kienhiepsi" keyboardType="phonePad" />}
    ${<TouchableTextInput value="kienhiepsi" keyboardType="asciiCapable" />}
    ${<TouchableTextInput value="kienhiepsi" keyboardType="numbersAndPunctuation" />}
    ${<TouchableTextInput value="kienhiepsi" keyboardType="visiblePassword" />}
  `('renders keyboardType correctly', ({ element }) => {
    const tree = renderer.create(element).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
