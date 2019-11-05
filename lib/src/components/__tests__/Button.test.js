import React from 'react';
import Button from '../Button';
import renderer from 'react-test-renderer';

describe('Button', () => {
  it.each`
    element
    ${<Button text="Button" onPress={() => {}} />}
    ${<Button text="Button" onPress={() => {}} disabled />}
    ${<Button text="Button" onPress={() => {}} loading />}
    ${<Button text="Button" onPress={() => {}} variant="outlined" />}
  `('renders correctly', ({ element }) => {
    const tree = renderer.create(element).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
