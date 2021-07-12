import React from 'react';

import { render } from '@testing-library/react-native';

import Container from '../Container.gen';

describe('Container', () => {
  it.each`
    element
    ${<Container direction="column" fluid="true" style={{ backgroundColor: 'yellow' }} />}
    ${<Container direction="row" fluid="false" style={{ backgroundColor: 'yellow' }} />}
    ${<Container direction="row-reverse" fluid="true" style={{ backgroundColor: 'yellow' }} />}
    ${<Container direction="column-reverse" fluid="true" style={{ backgroundColor: 'yellow' }} />}
    ${<Container />}
  `('renders correctly', async ({ element }) => {
    const { baseElement } = render(element);

    expect(baseElement).toMatchSnapshot();
  });
});
