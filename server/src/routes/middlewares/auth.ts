import { NextFunction, Request, Response } from 'express';
import { auth } from '../../../config/index';
import { DIinterface } from '../../database/index';
import jwt from 'jsonwebtoken';
import { User } from '../../database/entities';

type JwtPayload = {
  email: string,
  id: number
}

const COOKIE_NAME = auth.cookie.name;
const JWT_KEY = auth.jwt.key;

export const createAuthorizeMw = (DI: DIinterface) => ({
  authorize: async (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies[COOKIE_NAME];
    try {
      const payload = jwt.verify(cookie, JWT_KEY) as JwtPayload;
      const query = { id: payload.id };
      const user = await DI.em.findOne(User, query, { populate: ['accounts'] });
      if (!user) return res.sendStatus(401);
      req.body.user = user;

      return next();
    } catch (error) {
      console.log(error);

      return res.sendStatus(401);
    }
  }
});
