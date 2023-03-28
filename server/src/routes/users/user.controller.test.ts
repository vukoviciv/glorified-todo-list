/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildDbInit, buildReq, buildRes, buildUser } from '../../../test-utils/generate';
import { createUserCtrl } from './user.controller';

describe('user controller', () => {
  let DI;
  let controller: { list: any; getMe: any; createAccounts: any; };
  const loggedUser = buildUser();

  let res = buildRes();
  const user1 = buildUser();
  const user2 = buildUser();
  const users = [user1, user2];

  beforeAll(async () => {
    const emOverrides = {
      find: () => users,
      findOne: () => loggedUser
    };
    const dbInit = buildDbInit(emOverrides);
    DI = await dbInit();
    controller = createUserCtrl(DI);
  });

  it('calls list user', async () => {
    const req = buildReq();
    await controller.list(req, res);

    expect(res.json).toHaveBeenCalledWith(users);
  });

  it('calls getMe returning logged in user', async () => {
    const body = { user: loggedUser };
    const req = buildReq(body);
    await controller.getMe(req, res);

    expect(res.json).toHaveBeenCalledWith(req.body.user);
  });

  it('creates accounts for logged user', async () => {
    const mockedAccounts = ['four', 'five', 'six'];
    const resultUser = Object.assign(
      {},
      loggedUser,
      { accounts: mockedAccounts.concat(['one', 'two']) }
    );

    const overrides = {
      json: jest.fn(() => ({ user: resultUser }))
    };
    const body = {
      accountNames: mockedAccounts,
      user: loggedUser
    };
    const req = buildReq(body);
    res = buildRes(overrides);
    await controller.createAccounts(req, res);

    expect(res.json).toHaveBeenCalledWith({ user: loggedUser });
    expect(res.json).toHaveReturnedWith({ user: resultUser });
  });
});
