/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildDbInit, buildReq, buildRes, buildUser } from '../../../test-utils/generate';
import bcrypt from 'bcrypt';
import { createAuthCtrl } from './auth.controller';
import { DIinterface } from '../../database';
import jwt from 'jsonwebtoken';

describe('auth controller', () => {
  let DI: DIinterface;
  let controller: { login: any };

  const user = buildUser();

  beforeAll(async () => {
    const emOverrides = {
      findOne: jest.fn(() => user)
    };
    const dbInit = buildDbInit(emOverrides);
    DI = await dbInit();
    controller = createAuthCtrl(DI);
  });

  it('logs in with given password and email', async () => {
    const body = {
      email: user.email,
      password: '123456'
    };
    const req = buildReq(body);
    const resOverrides = {
      status: jest.fn(() => ({ send: jest.fn() }))
    };
    const res = buildRes(resOverrides);
    const spiedCompare = jest.spyOn(bcrypt, 'compare');
    const spiedJwt = jest.spyOn(jwt, 'sign');
    await controller.login(req, res);

    expect(DI.em.findOne).toHaveBeenCalled();
    expect(DI.em.findOne).toHaveReturnedWith(user);
    expect(spiedCompare).toHaveBeenCalledWith(body.password, user.password);
    expect(spiedJwt).toHaveBeenCalled(); // this is not being called?
  });
});
