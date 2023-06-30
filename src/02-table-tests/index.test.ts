import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 7, b: 2, action: Action.Divide, expected: 3.5 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 9, b: 3, action: Action.Multiply, expected: 27 },
  { a: 10, b: 3, action: Action.Multiply, expected: 30 },
  { a: 11, b: 4, action: Action.Multiply, expected: 44 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
];

const nullTestCases = [
  { a: '5', b: 3, action: Action.Exponentiate },
  { a: '5', b: undefined, action: Action.Exponentiate },
  { a: NaN, b: [], action: Action.Exponentiate },
  { a: 1, b: 2, action: null },
  { a: 1, b: 2, action: 'null' },
  { a: 1, b: 2, action: undefined },
];

describe('simpleCalculator', () => {
  describe.each(testCases)(`args(%i, %i)`, ({ a, b, action, expected }) => {
    test(`Should return result of ${action}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });

  describe.each(nullTestCases)(`Bad args `, ({ a, b, action }) => {
    test(`Should return null for invalid args or action`, () => {
      expect(simpleCalculator({ a, b, action })).toBeNull();
    });
  });
});
