import {
  arrayInsertAt,
  stringInsertAt,
  deserialize,
  serialize,
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

  describe('stringInsertAt', () => {
    it('works properly', () => {
      expect(stringInsertAt(2, 'c', 'abde')).toEqual('abcde');
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
});
