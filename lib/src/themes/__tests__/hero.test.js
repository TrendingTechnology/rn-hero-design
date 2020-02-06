import heroTheme from '../hero/Hero_Theme.bs';
import legacyTheme from '../legacy/Legacy_Theme.bs';

const getKeys = obj => {
  const keys = Object.keys(obj);
  keys.sort();
  return keys;
};

describe('Theme Hero', () => {
  it('has correct configs', () => {
    expect(heroTheme).toMatchSnapshot();
  });

  it('has exact keys with legacy theme', () => {
    const heroComponents = getKeys(heroTheme);
    const legacyComponents = getKeys(legacyTheme);

    expect(heroComponents).toEqual(legacyComponents);

    heroComponents.forEach(component => {
      expect(getKeys(heroTheme[component])).toEqual(
        getKeys(legacyTheme[component]),
      );
    });
  });
});
