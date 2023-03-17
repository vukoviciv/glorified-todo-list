/* eslint-disable @typescript-eslint/no-explicit-any */
import * as db from '../../database';
import { buildReq, buildRes } from '../../../test-utils/generate';
import { createUserCtrl } from './user.controller';
import { faker } from '@faker-js/faker';

it('calls list all users', async () => {
  const res = buildRes();
  const req = buildReq();
  const user1 = buildUser();
  const user2 = buildUser();
  const users = [user1, user2];

  const dbInit = jest.fn().mockImplementation(() => Promise.resolve({
    em: { find: () => users }
    // TODO: check that find is called with User entity
  }));
  const DI = await dbInit();
  const controller = createUserCtrl(DI);

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
