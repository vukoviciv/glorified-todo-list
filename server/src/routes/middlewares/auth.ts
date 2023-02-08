import { NextFunction, Request, Response } from 'express';
import { auth } from '../../../config/index';
import { DI } from '../../database/index';
import jwt from 'jsonwebtoken';
import { User } from '../../database/entities';

type JwtPayload = {
  email: string,
  id: number
}

const COOKIE_NAME = auth.cookie.name;
const JWT_KEY = auth.jwt.key;

export async function authorize(req: Request, res: Response, next: NextFunction) {
  const cookie = req.cookies[COOKIE_NAME];
  try {
    const payload = jwt.verify(cookie, JWT_KEY) as JwtPayload;
    const user = await DI.em.findOne(User, { id: payload.id }, { populate: ['accounts'] });
    if (!user) return res.sendStatus(401);
    req.body.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
}
