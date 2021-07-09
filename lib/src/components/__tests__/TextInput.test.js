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
    ${<TextInput value="kienhiepsi" keyboardType="namePhonePad" />}
    ${<TextInput value="kienhiepsi" keyboardType="webSearch" />}
    ${<TextInput value="kienhiepsi" keyboardType="numberPad" />}
    ${<TextInput value="kienhiepsi" keyboardType="decimalPad" />}
    ${<TextInput value="kienhiepsi" keyboardType="phonePad" />}
    ${<TextInput value="kienhiepsi" keyboardType="asciiCapable" />}
    ${<TextInput value="kienhiepsi" keyboardType="numbersAndPunctuation" />}
    ${<TextInput value="kienhiepsi" keyboardType="visiblePassword" />}
  `('renders keyboardType correctly', ({ element }) => {
    const tree = renderer.create(element).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
