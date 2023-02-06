import { NextFunction, Request, Response } from 'express';
import { Account } from '../../database/entities';
import { DI } from '../../database/index';

export async function getAccount(req: Request, _res: Response, next: NextFunction) {
  const accounts = await DI.em.find(Account, {});
  if (!accounts) throw new Error('NO ACCOUNT');

  const activeAccount = accounts.pop();
  req.body.account = activeAccount;
  next();
}

export function parseParamId(req: Request, _res: Response, next: NextFunction, id: string) {
  const parsedId = parseInt(id);
  if (Number.isNaN(parsedId)) throw new Error('ID is not an integer!');

  req.body.parsedId = parsedId;
  next();
}
