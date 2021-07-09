/* TypeScript file generated from Helpers.re by genType. */
/* eslint-disable import/first */

// tslint:disable-next-line:no-var-requires
import Hero_Theme from '../themes/hero/Hero_Theme.gen';
import Legacy_Theme from '../themes/legacy/Legacy_Theme.gen';

// https://stackoverflow.com/questions/53807517/how-to-test-if-two-types-are-exactly-the-same
/**
 * Tests if two types are equal
 */
type IfEquals<T, U, Y = unknown, N = never> = (<G>() => G extends T
  ? 1
  : 2) extends (<G>() => G extends U ? 1 : 2)
  ? Y
  : N;
declare const exactType: <T, U>(
  draft: T & IfEquals<T, U>,
  expected: U & IfEquals<T, U>,
) => IfEquals<T, U>;

//if Hero_Theme is not match to Legacy_Theme, the compile shows error
exactType(Hero_Theme, Legacy_Theme); // error

export type Theme = typeof Hero_Theme;

declare const useTheme: () => Theme;

export { useTheme };
