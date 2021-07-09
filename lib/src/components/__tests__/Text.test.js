import React from 'react';

import { render } from '@testing-library/react-native';

import Text from '../Text.gen';

describe('Text', () => {
  it.each`
    element
    ${(<Text size="h1" weight="100" ellipsizeMode="clip" numberOfLines={2} onPress={() => {}} />)}
    ${(<Text size="h2" weight="normal" ellipsizeMode="tail" numberOfLines={2} onPress={() => {}} />)}
    ${(<Text size="h3" weight="bold" ellipsizeMode="middle" numberOfLines={2} onPress={() => {}} />)}
    ${(<Text size="h4" weight="600" ellipsizeMode="head" numberOfLines={2} onPress={() => {}} />)}
    ${(<Text size="h5" weight="1000" ellipsizeMode="clip" numberOfLines={2} onPress={() => {}} />)}
  `('renders correctly', ({ element }) => {
    const { baseElement } = render(element);
    expect(baseElement).toMatchSnapshot();
  });
});
