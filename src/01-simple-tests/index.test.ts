// Uncomment the code below and write your tests
import { simpleCalculator, Action, RawCalculatorInput } from './index';

const createTestData = (Action: Action | unknown): RawCalculatorInput => {
  return { a: 4, b: 2, action: Action };
};

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator(createTestData(Action.Add))).toBe(6);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator(createTestData(Action.Subtract))).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator(createTestData(Action.Multiply))).toBe(8);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator(createTestData(Action.Divide))).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator(createTestData(Action.Exponentiate))).toBe(16);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator(createTestData('Invalid action'))).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator(createTestData({ a: 'sd', b: 3.4, action: Action.Add })),
    ).toBeNull();
  });
});
