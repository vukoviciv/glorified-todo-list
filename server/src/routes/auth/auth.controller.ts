import { Request, Response } from 'express';
import { auth } from '../../../config/index';
import bcrypt from 'bcrypt';
import { DI } from '../../database/index';
import jwt from 'jsonwebtoken';
import { User } from '../../database/entities/index';

const COOKIE_NAME = auth.cookie.name;
const JWT_KEY = auth.jwt.key;

async function login(req: Request, res: Response) {
  const { body: { email, password } } = req;
  if (!email) return res.status(404).send('Email does not exist.');

  const user = await DI.em.findOne(User, { email });
  if (!user) return res.status(403).send('Invalid password or email');

  const result = await bcrypt.compare(password, user.password);
  if (!result) return res.status(403).send('Invalid password or email');

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

async function register({ body }: Request, res: Response) {
  const { firstName, lastName, email, password } = body;
  const existingUser = await DI.em.findOne(User, { email });
  if (existingUser) return res.status(409).send('User with the given email already exists');

  const user = new User({ firstName, lastName, email, password });
  await DI.em.persistAndFlush(user);

  return res.json(user);
}

async function updatePassword({ body }: Request, res: Response) {
  const { password, email } = body;
  const user = await DI.em.findOne(User, { email });
  if (!user) return res.status(404).send('Email does not exist');
  if (!user.hasTempPassword) res.status(401).send('User with a given email has already set the password!'); // this crashes the app
  user.password = password;
  user.hasTempPassword = false;
  await DI.em.persistAndFlush(user);

  return res.status(200).json({ success: true });
}

export {
  login,
  logout,
  register,
  updatePassword
};
