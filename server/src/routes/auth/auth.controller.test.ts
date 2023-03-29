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
      cookie: jest.fn().mockReturnThis(),
      json: jest.fn(() => user)
    };
    const res = buildRes(resOverrides);
    const spiedJwt = jest
      .spyOn(jwt, 'sign')
      .mockImplementation(() => Promise.resolve('jwt_mock_data-1234!'));
    const spiedCompare = jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(true));
    await controller.login(req, res);

    expect(DI.em.findOne).toHaveBeenCalled();
    expect(DI.em.findOne).toHaveReturnedWith(user);
    expect(spiedJwt).toHaveBeenCalled();
    expect(spiedCompare).toHaveReturned();
    expect(res.json).toHaveReturnedWith(user);
  });

  it('fails to login without an email', async () => {
    const body = {
      email: null,
      password: '123456'
    };
    const req = buildReq(body);
    const res = buildRes({ send: jest.fn(() => res) });

    const statusSpy = jest.spyOn(res, 'status');
    const sendSpy = jest.spyOn(res, 'send');

    await controller.login(req, res);

    expect(statusSpy).toBeCalledWith(404);
    expect(sendSpy).toBeCalledWith('Email does not exist.');
  });
});
