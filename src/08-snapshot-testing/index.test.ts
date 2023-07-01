// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const values = [1];
    const result = generateLinkedList(values);

    expect(result).toStrictEqual({
      next: { next: null, value: null },
      value: 1,
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = [1, 2];
    const result = generateLinkedList(values);

    expect(result).toMatchSnapshot({
      next: { next: { next: null, value: null }, value: 2 },
      value: 1,
    });
  });
});
