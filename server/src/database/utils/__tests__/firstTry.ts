import { isPasswordAllowed, sum } from '../firstTry';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// password

test('isPasswordAllowed returns true for valid password', () => {
  expect(isPasswordAllowed('!aBc123')).toBe(true);
});

test('isPasswordAllowed returns false for invalid password', () => {
  expect(isPasswordAllowed('a2c!')).toBe(false);
  expect(isPasswordAllowed('123456!')).toBe(false);
  expect(isPasswordAllowed('ABC123!')).toBe(false);
  expect(isPasswordAllowed('abc123!')).toBe(false);
  expect(isPasswordAllowed('ABCdef123')).toBe(false);
});
