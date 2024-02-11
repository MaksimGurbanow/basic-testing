// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const result = (a: unknown, b: unknown, action: unknown) =>
    simpleCalculator({ a, b, action });
  test('should add two numbers', () => {
    expect(result(1, 2, Action.Add)).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(result(5, 3, Action.Subtract)).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(result(5, 3, Action.Multiply)).toBe(15);
  });

  test('should divide two numbers', () => {
    expect(result(6, 3, Action.Divide)).toBe(2);
    expect(result(5, 3, Action.Divide)).toBe(5 / 3);
  });

  test('should exponentiate two numbers', () => {
    expect(result(6, 3, Action.Exponentiate)).toBe(216);
    expect(result(2, 3, Action.Exponentiate)).toBe(8);
    expect(result(5, -2, Action.Exponentiate)).toBe(0.04);
  });

  test('should return null for invalid action', () => {
    expect(result(5, 3, 'unknown')).toBeNull();
    expect(result(5, 3, true)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(result('abc', 3, Action.Add)).toBeNull();
    expect(result(5, 'xyz', Action.Add)).toBeNull();
    expect(result(null, 3, Action.Add)).toBeNull();
    expect(result(5, undefined, Action.Add)).toBeNull();
  });
});
