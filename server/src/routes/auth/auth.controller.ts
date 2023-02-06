import { Request, Response } from 'express';
import { DI } from '../../database/index';
import jwt from 'jsonwebtoken';
import { User } from '../../database/entities/index';

const COOKIE_NAME = 'test';
const SECRET_KEY = 'lalalasupersecretkey';

async function login(req: Request, res: Response) {
  const { body: { email } } = req;
  if (!email) throw Error('Email required');

  const user = await DI.em.findOne(User, { email });
  if (!user) throw Error(`User with email: ${email} does not exist.`);

  const payload = { email: user.email, id: user.id };
  const jwtData = jwt.sign(payload, SECRET_KEY);

  return res
    .cookie(COOKIE_NAME, jwtData)
    .json(user);
}

async function logout(_req: Request, res: Response) {
  return res
    .clearCookie(COOKIE_NAME)
    .json('logged out');
}

export { login, logout };
