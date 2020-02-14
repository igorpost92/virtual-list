import makeRange from './makeRange';

it('should work', () => {
  const expected = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  const result = makeRange(2, 10);
  expect(result).toEqual(expected);
});

it('should work', () => {
  const expected: number[] = [];
  const result = makeRange(10, 2);
  expect(result).toEqual(expected);
});
