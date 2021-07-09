import React from 'react';
import Container from '../Container.gen';
import renderer from 'react-test-renderer';

describe('Container', () => {
  it.each`
    element
    ${<Container direction="column" fluid="true" style={{ backgroundColor: 'yellow' }} />}
    ${<Container direction="row" fluid="false" style={{ backgroundColor: 'yellow' }} />}
    ${<Container direction="rowReverse" fluid="true" style={{ backgroundColor: 'yellow' }} />}
    ${<Container direction="columnReverse" fluid="true" style={{ backgroundColor: 'yellow' }} />}
    ${<Container />}
  `('renders correctly', ({ element }) => {
    const tree = renderer.create(element).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
