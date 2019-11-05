import React from 'react';
import TextInput from '../TextInput';
import renderer from 'react-test-renderer';

describe('TextInput', () => {
  it.each`
    element
    ${<TextInput value="" onChange={() => {}} label="" />}
    ${<TextInput value="" onChange={() => {}} label="Email" />}
    ${<TextInput value="" onChange={() => {}} label="Email" rightIcon="email" />}
    ${<TextInput value="" onChange={() => {}} label="Email" rightIcon="email" disabled />}
    ${<TextInput value="" onChange={() => {}} label="Email" rightIcon="email" disabled error="error" />}
  `('renders correctly', ({ element }) => {
    const tree = renderer.create(element).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
