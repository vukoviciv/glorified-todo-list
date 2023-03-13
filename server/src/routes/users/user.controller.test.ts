import * as controller from './user.controller';
import * as db from '../../database/index';
import { buildReq, buildRes } from '../../../test-utils/generate';
import { faker } from '@faker-js/faker';

jest.mock('../../database/index');

beforeEach(() => {
  jest.clearAllMocks();
});

test('calls list returns users', async () => {
  const res = buildRes();
  const req = buildReq();
  const user1 = buildUser();
  const user2 = buildUser();
  const users = [user1, user2];

  // jest.spyOn(db.DI.orm.em, 'find'); --> TypeError: Cannot read properties of undefined (reading 'em')
  await controller.list(req, res);
  expect(res.json).toHaveBeenCalledWith(users);
  expect(res.json).toHaveBeenCalledTimes(1);
});

function buildUser() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLocaleLowerCase(),
    hasTempPassword: false,
    password: '123456'
  };
}

// TODO: how to mock DI.em.find method?!?
