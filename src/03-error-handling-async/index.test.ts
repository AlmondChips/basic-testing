// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = { data: 'Hello', date: Date.now() };
    const data = await resolveValue(value);
    expect(data).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMsg = 'Error message';
    expect(() => throwError(errorMsg)).toThrow(errorMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    try {
      await rejectCustomError();
    } catch (e) {
      expect(e).toBeInstanceOf(MyAwesomeError);
    }
  });
});
