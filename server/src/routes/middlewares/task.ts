import { NextFunction, Request, Response } from 'express';
import { DI } from '../../database/index';
import { User } from '../../database/entities';

export async function getUser(req: Request, _res: Response, next: NextFunction) {
  const users = await DI.em.find(User, {});
  if (!users) throw new Error('NO USER');

  req.body.user = users.pop();
  next();
}

export function parseParamId(req: Request, _res: Response, next: NextFunction, id: string) {
  const parsedId = parseInt(id);
  if (Number.isNaN(parsedId)) throw new Error('ID is not an integer!');

  req.body.parsedId = parsedId;
  next();
}
