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
  res.cookie(COOKIE_NAME, jwtData);

  return res.json(user);
}

async function logout(req: Request, res: Response) {
  return res.json('logged out');
}

export { login, logout };
