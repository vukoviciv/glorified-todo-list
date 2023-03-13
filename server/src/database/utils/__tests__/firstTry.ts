import { isPasswordAllowed, sum } from '../firstTry';
import cases from 'jest-in-case';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

type CaseObj = {
  [key: string]: string
}

// password
const casify = (obj: CaseObj) => {
  const entries = Object.entries(obj);
  const mapped = entries.map(([name, password]) => {
    return {
      name: `${password} - ${name}`,
      password
    };
  });
  return mapped;
};

cases(
  'isPasswordAllowed: valid passwords',
  options => {
    expect(isPasswordAllowed(options.password)).toBe(true);
  }, casify({ 'valid password': '!aBc123' })
);

cases(
  'isPasswordAllowed: invalid passwords',
  options => {
    expect(isPasswordAllowed(options.password)).toBe(false);
  }, casify({
    'too short': 'a2c!',
    'no letters': '123456!',
    'no numbers': 'ABCdef!',
    'no lowercase': 'ABC123!',
    'no uppercase': 'abc123!',
    'no non-alphanumerical char': 'ABCdef123'
  })
);

// another way

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
