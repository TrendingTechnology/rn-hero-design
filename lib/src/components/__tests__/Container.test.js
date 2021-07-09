import React from 'react';
import Container from '../Container.gen';
import { fireEvent, render, wait } from '@testing-library/react-native';

describe('Container', () => {
  it.each`
    element                                                                                       | expectedValue
    ${<Container direction="column" fluid="true" style={{ backgroundColor: 'yellow' }} />}        | ${'column'}
    ${<Container direction="row" fluid="false" style={{ backgroundColor: 'yellow' }} />}          | ${'row'}
    ${<Container direction="rowReverse" fluid="true" style={{ backgroundColor: 'yellow' }} />}    | ${'row-reverse'}
    ${<Container direction="columnReverse" fluid="true" style={{ backgroundColor: 'yellow' }} />} | ${'column-reverse'}
    ${<Container />}                                                                              | ${'column'}
  `(
    'renders correctly expect flexDirection is $expectedValue',
    ({ element, expectedValue }) => {
      const tree = render(element);
      expect(tree.asJSON()).toMatchSnapshot();
    },
  );
});
