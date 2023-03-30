/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildDbInit, buildReq, buildRes, buildUser } from '../../../test-utils/generate';
import bcrypt from 'bcrypt';
import { createAuthCtrl } from './auth.controller';
import jwt from 'jsonwebtoken';

const preSetup = async (user: any) => {
  const emOverrides = {
    findOne: jest.fn(() => user)
  };
  const dbInit = buildDbInit(emOverrides);
  const DI = await dbInit();
  const controller = createAuthCtrl(DI);

  return { controller, DI };
};

describe('auth controller', () => {
  const user = buildUser();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('logs in with given correct password and email', async () => {
    const { controller, DI } = await preSetup(user);
    const body = {
      email: user.email,
      password: user.password
    };
    const req = buildReq(body);
    const resOverrides = {
      cookie: jest.fn().mockReturnThis(),
      json: jest.fn(() => user),
      send: jest.fn(() => res)
    };
    const res = buildRes(resOverrides);
    const jwtSpy = jest.spyOn(jwt, 'sign').mockImplementation(() => 'mocked-jwt-data');
    const compareSpy = jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
    await controller.login(req, res);

    expect(DI.em.findOne).toHaveBeenCalledTimes(1);
    expect(DI.em.findOne).toHaveReturnedWith(user);
    expect(compareSpy).toHaveBeenCalledTimes(1);
    expect(jwtSpy).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveReturnedWith(user);
  });

  it('fails to login without an email', async () => {
    const { controller } = await preSetup(user);
    const body = {
      email: null
    };
    const req = buildReq(body);
    const res = buildRes({ send: jest.fn(() => res) });

    const statusSpy = jest.spyOn(res, 'status');
    const sendSpy = jest.spyOn(res, 'send');

    await controller.login(req, res);

    expect(statusSpy).toBeCalledWith(404);
    expect(sendSpy).toBeCalledWith('Email does not exist.');
  });

  it('fails for non-existing user', async () => {
    const { controller } = await preSetup(null);
    const body = {
      email: 'non-existing-user@gmail.com'
    };
    const req = buildReq(body);
    const res = buildRes({ send: jest.fn(() => res) });

    const statusSpy = jest.spyOn(res, 'status');
    const sendSpy = jest.spyOn(res, 'send');

    await controller.login(req, res);

    expect(statusSpy).toBeCalledWith(403);
    expect(sendSpy).toBeCalledWith('Invalid password or email');
  });

  it('fails for a wrong password', async () => {
    const { controller } = await preSetup(user);
    const body = {
      email: 'useremail@gmail.com',
      password: '123456'
    };
    const req = buildReq(body);
    const res = buildRes({ send: jest.fn(() => res) });

    const compareSpy = jest.spyOn(bcrypt, 'compare');
    const statusSpy = jest.spyOn(res, 'status');
    const sendSpy = jest.spyOn(res, 'send');

    await controller.login(req, res);

    expect(compareSpy).toBeCalledWith(body.password, user.password);
    expect(statusSpy).toBeCalledWith(403);
    expect(sendSpy).toBeCalledWith('Invalid password or email');
  });
});
