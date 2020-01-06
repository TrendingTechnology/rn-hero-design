import heroTheme from '../themes/hero/Hero_Theme.bs';
import legacyTheme from '../themes/legacy';
import darkKnightTheme from '../themes/dark-knight';

let themes = {
  default: heroTheme,
  hero: heroTheme,
  legacy: legacyTheme,
  'dark-knight': darkKnightTheme,
};

export default {
  getTheme: (name = 'default') => themes[name],
  setTheme: (name, theme) => (themes[name] = theme),
};
