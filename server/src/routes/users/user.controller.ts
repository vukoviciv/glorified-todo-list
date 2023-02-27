import { Account, User } from '../../database/entities';
import { Request, Response } from 'express';
import { DI } from '../../database/index';

async function list(_req: Request, res: Response) {
  const users = await DI.em.find(User, {});

  return res.json(users);
}

async function getMe({ body: { user } }: Request, res: Response) {
  return res.json(user);
}

async function createAccounts({ body: { accounts, user } }: Request, res: Response) {
  for (const account of accounts) {
    const accountEntity = new Account({ user, name: account.name });
    DI.em.persist(accountEntity);
  }
  DI.em.flush();
  return res.status(200).json({ user, accounts });
}

export {
  list,
  getMe,
  createAccounts
};
