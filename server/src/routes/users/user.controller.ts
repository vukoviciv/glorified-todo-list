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

async function createAccounts({ body: { accountNames, user } }: Request, res: Response) {
  const activeUser = await DI.em.findOne(User, { id: user.id });
  if (!activeUser) throw Error('User not found');
  for (const name of accountNames) {
    if (!name) continue;
    const account = new Account({ user, name });
    await DI.em.persist(account);
    activeUser.accounts.add(account);
  }
  await DI.em.flush();
  return res.status(200).json({ user });
}

export {
  list,
  getMe,
  createAccounts
};
