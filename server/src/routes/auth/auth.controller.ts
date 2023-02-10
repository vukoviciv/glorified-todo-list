import { Request, Response } from 'express';
import { auth } from '../../../config/index';
import { DI } from '../../database/index';
import jwt from 'jsonwebtoken';
import { User } from '../../database/entities/index';

const COOKIE_NAME = auth.cookie.name;
const JWT_KEY = auth.jwt.key;

async function login(req: Request, res: Response) {
  const { body: { email } } = req;
  if (!email) return res.status(404).send('Email does not exist');

  const user = await DI.em.findOne(User, { email });
  if (!user) return res.status(404).send('User with that email not found');

  const payload = { email: user.email, id: user.id };
  const jwtData = jwt.sign(payload, JWT_KEY);

  return res
    .cookie(COOKIE_NAME, jwtData)
    .json(user);
}

async function logout(_req: Request, res: Response) {
  return res
    .clearCookie(COOKIE_NAME)
    .sendStatus(200);
}

export { login, logout };
