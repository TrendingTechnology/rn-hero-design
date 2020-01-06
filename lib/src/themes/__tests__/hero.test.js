import heroTheme from '../hero/Hero_Theme.bs';

describe('Theme Hero', () => {
  it('has correct configs', () => {
    expect(heroTheme).toMatchSnapshot();
  });
});
