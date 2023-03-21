/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildReq, buildRes } from '../../../test-utils/generate';
import { Account } from '../../database/entities';
import { createUserCtrl } from './user.controller';
import { faker } from '@faker-js/faker';

jest.mock('../../database/entities');

describe('user controller', () => {
  let DI;
  let controller: { list: any; getMe: any; createAccounts: any; };
  const loggedUser = buildUser();

  let res = buildRes();
  const req = buildReq();
  const user1 = buildUser();
  const user2 = buildUser();
  const users = [user1, user2];

  beforeAll(async () => {
    const dbInit = jest.fn().mockImplementation(() => Promise.resolve({
      em: {
        find: () => users,
        findOne: () => loggedUser,
        persist: jest.fn(),
        flush: jest.fn()
      },
      AccountEntity: Account
    }));
    DI = await dbInit();
    controller = createUserCtrl(DI);
  });

  it('calls list user', async () => {
    await controller.list(req, res);

    expect(res.json).toHaveBeenCalledWith(users);
  });

  it('calls getMe returning logged in user', async () => {
    req.body.user = loggedUser;

    await controller.getMe(req, res);
    expect(res.json).toHaveBeenCalledWith(req.body.user);
  });

  it('creates accounts for logged user', async () => {
    const mockedAccounts = ['four', 'five', 'six'];
    const resultUser = Object.assign({}, loggedUser, { accounts: mockedAccounts.concat(['one', 'two']) });

    const overrides = {
      json: jest.fn(() => ({ user: resultUser }))
    };
    res = buildRes(overrides);
    req.body = {
      accountNames: mockedAccounts,
      user: loggedUser
    };
    await controller.createAccounts(req, res);
    expect(res.json).toHaveBeenCalledWith({ user: loggedUser });
    expect(res.json).toHaveReturnedWith({ user: resultUser });
  });
});

function buildUser(existingAccounts = ['one', 'two']) {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLocaleLowerCase(),
    hasTempPassword: false,
    password: '123456',
    accounts: {
      add: () => jest.fn().mockResolvedValue(existingAccounts)
    }
  };
}
