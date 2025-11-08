// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Add })).toBe(8);
    expect(simpleCalculator({ a: 5, b: -3, action: Action.Add })).toBe(2);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Subtract })).toBe(2);
    expect(simpleCalculator({ a: 5, b: -3, action: Action.Subtract })).toBe(8);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Multiply })).toBe(6);
    expect(simpleCalculator({ a: -2, b: 3, action: Action.Multiply })).toBe(-6);
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 1.5, b: 2, action: Action.Multiply })).toBe(3);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Divide })).toBe(2);
    expect(simpleCalculator({ a: -6, b: 3, action: Action.Divide })).toBe(-2);
    expect(simpleCalculator({ a: 1, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
    expect(simpleCalculator({ a: -1, b: 0, action: Action.Divide })).toBe(
      -Infinity,
    );
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Divide })).toBeNaN();
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Exponentiate })).toBe(
      9,
    );
    expect(
      simpleCalculator({ a: 9, b: 0.5, action: Action.Exponentiate }),
    ).toBe(3);
    expect(simpleCalculator({ a: 2, b: -1, action: Action.Exponentiate })).toBe(
      0.5,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: '%' as Action })).toBeNull();
    expect(
      simpleCalculator({ a: 5, b: 3, action: null as unknown as Action }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: 5, b: 3, action: 123 as unknown as Action }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '5', b: 3, action: Action.Add })).toBeNull();
    expect(
      simpleCalculator({ a: true, b: 5, action: Action.Subtract }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: [5], b: 5, action: Action.Multiply }),
    ).toBeNull();
  });
});
