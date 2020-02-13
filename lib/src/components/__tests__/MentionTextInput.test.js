import {
  arrayInsertAt,
  stringReplace,
  deserialize,
  serialize,
  getAffectedMentionIndexes,
} from '../MentionTextInput.bs';

describe('MentionTextInput', () => {
  describe('arrayInsertAt', () => {
    it('works properly', () => {
      expect(arrayInsertAt(2, 'c', ['a', 'b', 'd', 'e'])).toEqual([
        'a',
        'b',
        'c',
        'd',
        'e',
      ]);
    });
  });

  describe('stringReplace', () => {
    it('works properly', () => {
      expect(stringReplace(2, 4, 'c', 'abdef')).toEqual('abcf');
    });
  });

  describe('deserialize', () => {
    it('works properly', () => {
      expect(
        deserialize([
          { text: 'Test ' },
          { text: '@Toan', ref: '1' },
          { text: ' and ' },
          { text: '@Hieu', ref: '2' },
        ]),
      ).toEqual([
        'Test @Toan and @Hieu',
        [
          { id: '1', name: '@Toan', offset: [5, 11] },
          { id: '2', name: '@Hieu', offset: [15, 21] },
        ],
      ]);
    });
  });

  describe('serialize', () => {
    it('works properly', () => {
      expect(
        serialize('@Toan, @Hieu and @ReasonML', [
          { id: '1', name: '@Toan', offset: [0, 6] },
          { id: '2', name: '@Hieu', offset: [7, 13] },
          { id: '3', name: '@ReasonML', offset: [17, 27] },
        ]),
      ).toEqual([
        { text: '', ref: undefined },
        { text: '@Toan', ref: '1' },
        { text: ', ', ref: undefined },
        { text: '@Hieu', ref: '2' },
        { text: ' and ', ref: undefined },
        { text: '@ReasonML', ref: '3' },
        { text: '', ref: undefined },
      ]);

      expect(
        serialize('@Toan@Hieu@ReasonML', [
          { id: '1', name: '@Toan', offset: [0, 6] },
          { id: '2', name: '@Hieu', offset: [5, 11] },
          { id: '3', name: '@ReasonML', offset: [10, 20] },
        ]),
      ).toEqual([
        { text: '', ref: undefined },
        { text: '@Toan', ref: '1' },
        { text: '', ref: undefined },
        { text: '@Hieu', ref: '2' },
        { text: '', ref: undefined },
        { text: '@ReasonML', ref: '3' },
        { text: '', ref: undefined },
      ]);
    });
  });

  describe('getAffectedMentionIndexes', () => {
    let mentions = [
      { id: '1', name: '@Toan', offset: [0, 6] },
      { id: '2', name: '@Hieu', offset: [7, 13] },
      { id: '3', name: '@ReasonML', offset: [17, 27] },
    ];

    it.each`
      selection   | result
      ${[0, 0]}   | ${[[], [0, 1, 2]]}
      ${[1, 1]}   | ${[[0], [1, 2]]}
      ${[5, 6]}   | ${[[0], [1, 2]]}
      ${[6, 6]}   | ${[[], [1, 2]]}
      ${[13, 17]} | ${[[], [2]]}
      ${[5, 8]}   | ${[[0, 1], [2]]}
      ${[99, 99]} | ${[[], []]}
    `('works properly', ({ selection, result }) => {
      expect(getAffectedMentionIndexes(selection, mentions)).toEqual(result);
    });
  });
});
