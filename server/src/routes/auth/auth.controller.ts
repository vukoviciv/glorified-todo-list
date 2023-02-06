import { Request, Response } from 'express';
import { DI } from '../../database/index';
import { User } from '../../database/entities/index';

async function login({ body: { email } }: Request, res: Response) {
  if (!email) throw Error('Email required');

  const user = await DI.em.findOne(User, { email });
  if (!user) throw Error(`User with email: ${email} does not exist.`);

  return res.json(user);
}

async function logout(req: Request, res: Response) {
  return res.json('logged out');
}

export { login, logout };
