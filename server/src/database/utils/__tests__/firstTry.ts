import { isPasswordAllowed, sum } from '../firstTry';
import cases from 'jest-in-case';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// password

cases(
  'isPasswordAllowed: valid passwords',
  options => {
    expect(isPasswordAllowed(options.password)).toBe(true);
  }, {
    'valid password': {
      password: '!aBc123'
    }
  }
);

cases(
  'isPasswordAllowed: invalid passwords',
  options => {
    expect(isPasswordAllowed(options.password)).toBe(false);
  }, {
    'too short': { password: 'a2c!' },
    'no letters': { password: '123456!' },
    'no numbers': { password: 'ABCdef!' },
    'no lowercase': { password: 'ABC123!' },
    'no uppercase': { password: 'abc123!' },
    'no non-alphanumerical char': { password: 'ABCdef123' }
  }
);

describe('isPasswordAllowed only allows some passwords', () => {
  const allowedPasswords = ['!aBc123'];
  const disallowedPasswords = [
    'a2c!',
    '123456!',
    'ABCdef!',
    'ABC123!',
    'abc123!',
    'ABCdef123'
  ];
  allowedPasswords.forEach(password => {
    test(`allows ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(true);
    });
  });
  disallowedPasswords.forEach(password => {
    test(`disallows ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(false);
    });
  });
});
