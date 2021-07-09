import React from 'react';
import ErrorScreen from '../ErrorScreen.gen';

import renderer from 'react-test-renderer';

describe('ErrorScreen', () => {
  it.each`
    element
    ${<ErrorScreen imageSource="imageSource" title="title" subtitle="subTitle" actions={[]} onPressClose={() => {}} />}
  `('renders correctly', ({ element }) => {
    const tree = renderer.create(element).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
