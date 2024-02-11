import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 5, b: 3, action: Action.Divide, expected: 5 / 3 },
  { a: 6, b: 3, action: Action.Exponentiate, expected: 216 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 5, b: -2, action: Action.Exponentiate, expected: 5 ** -2 },
  { a: 5, b: 3, action: 'unknown', expected: null },
  { a: 5, b: 3, action: true, expected: null },
  { a: 'abc', b: 3, action: Action.Add, expected: null },
  { a: 5, b: 'xyz', action: Action.Add, expected: null },
  { a: null, b: 3, action: Action.Add, expected: null },
  { a: 5, b: undefined, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'table tests API for testing every case',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
