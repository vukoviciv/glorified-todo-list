import { NextFunction, Request, Response } from 'express';
import { DI } from '../../database/index';
import jwt from 'jsonwebtoken';
import { User } from '../../database/entities';

const COOKIE_NAME = 'test'; // TODO:
const SECRET_KEY = 'lalalasupersecretkey';

type Jwt = {
  email: string,
  id: number
}

export async function authorize(req: Request, _res: Response, next: NextFunction) {
  const cookie = req.cookies[COOKIE_NAME];
  const payload = jwt.verify(cookie, SECRET_KEY) as Jwt;

  const user = await DI.em.find(User, { id: payload.id });
  if (!user) throw new Error('NO USER');

  req.body.user = user;
  next();
}
