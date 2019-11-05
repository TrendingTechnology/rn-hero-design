import heroTheme from '../hero';

describe('Theme Hero', () => {
  it('has correct configs', () => {
    expect(heroTheme).toMatchSnapshot();
  });
});
