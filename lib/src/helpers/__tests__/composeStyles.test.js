import composeStyles from '../composeStyles';

describe('composeStyles', () => {
  it.each`
    styles                                        | expected
    ${[{ color: 'black' }, { color: undefined }]} | ${{ color: 'black' }}
    ${[{ color: 'black' }, {}, null, undefined]}  | ${{ color: 'black' }}
    ${[{ width: 100 }, { width: 0 }]}             | ${{ width: 0 }}
  `('works properly', ({ styles, expected }) => {
    expect(composeStyles(styles)).toEqual(expected);
  });
});
