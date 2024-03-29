import { Request, Response } from 'express';
import { DIinterface } from '../../database/index';

export const createUserCtrl = (DI: DIinterface) => ({
  list: async (_req: Request, res: Response) => {
    const users = await DI.em.find(DI.UserEntity, {});

    return res.json(users);
  },

  getMe: async ({ body: { user } }: Request, res: Response) => {
    return res.json(user);
  },

  createAccounts: async ({ body: { accountNames, user } }: Request, res: Response) => {
    const activeUser = await DI.em.findOne(DI.UserEntity, { id: user.id });
    if (!activeUser) throw Error('User not found');
    for (const name of accountNames) {
      if (!name) continue;
      const account = new DI.AccountEntity({ user, name });
      await DI.em.persist(account);
      activeUser.accounts.add(account);
    }
    await DI.em.flush();

    return res.status(200).json({ user });
  }
});
