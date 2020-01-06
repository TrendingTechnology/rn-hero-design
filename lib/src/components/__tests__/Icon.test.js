import React from 'react';
import Icon from '../Icon.bs';
import renderer from 'react-test-renderer';

describe('Icon', () => {
  it.each`
    element
    ${<Icon icon="email-outline" />}
    ${<Icon icon="email-outline" color="red" />}
    ${<Icon icon="email-outline" color="red" size={48} />}
  `('renders correctly', ({ element }) => {
    const tree = renderer.create(element).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
