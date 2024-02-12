import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  const value = 1;
  const expectedLinkedList = {
    value: 1,
    next: {
      value: null,
      next: null,
    },
  };
  const generatedLinkedList = generateLinkedList([value]);
  test('should generate linked list from values 1', () => {
    expect(generatedLinkedList).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generatedLinkedList).toMatchSnapshot();
  });
});
