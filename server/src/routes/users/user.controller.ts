import { Request, Response } from 'express';
import { DI } from '../../database/index';
import { User } from '../../database/entities';

async function list(_req: Request, res: Response) {
  const users = await DI.em.find(User, {});

  return res.json(users);
}

async function getMe({ body: { user } }: Request, res: Response) {
  return res.json(user[0]); // TODO: fix this in mdw
}

export {
  list,
  getMe
};
