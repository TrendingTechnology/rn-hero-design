import React from 'react';

import { render } from '@testing-library/react-native';

import Icon from '../Icon.gen';

describe('Icon', () => {
  it.each`
    element
    ${<Icon icon="email-outline" />}
    ${<Icon icon="email-outline" color="red" />}
    ${<Icon icon="email-outline" color="red" size={48} />}
  `('renders correctly', async ({ element }) => {
    const { baseElement } = render(element);

    expect(baseElement).toMatchSnapshot();
  });
});
