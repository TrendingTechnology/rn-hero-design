import heroTheme from '../themes/hero';
import legacyTheme from '../themes/legacy';

let themes = {
  default: heroTheme,
  hero: heroTheme,
  legacy: legacyTheme,
};

export default {
  getTheme: (name = 'default') => themes[name],
  setTheme: (name, theme) => (themes[name] = theme),
};
