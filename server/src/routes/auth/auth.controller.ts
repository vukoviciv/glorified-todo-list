import { Request, Response } from 'express';
import { auth } from '../../../config/index';
import bcrypt from 'bcrypt';
import { DIinterface } from '../../database/index';
import jwt from 'jsonwebtoken';
import { User } from '../../database/entities/index';

const COOKIE_NAME = auth.cookie.name;
const JWT_KEY = auth.jwt.key;

export const createAuthCtrl = (DI: DIinterface) => ({
  login: async ({ body }: Request, res: Response) => {
    if (!body.email) return res.status(404).send('Email does not exist.');

    const user = await DI.em.findOne(User, { email: body.email });
    if (!user) return res.status(403).send('Invalid password or email');

    const result = await bcrypt.compare(body.password, user.password);
    if (!result) return res.status(403).send('Invalid password or email');

    const { email, id } = user;
    const jwtData = jwt.sign({ email, id }, JWT_KEY);

    return res
      .cookie(COOKIE_NAME, jwtData)
      .json(user);
  },

  logout: (_req: Request, res: Response) => {
    return res
      .clearCookie(COOKIE_NAME)
      .sendStatus(200);
  },

  register: async ({ body }: Request, res: Response) => {
    const { firstName, lastName, email, password } = body;
    const existingUser = await DI.em.findOne(User, { email });
    if (existingUser) {
      return res.status(409).send('User with the given email already exists');
    }

    const user = new User({ firstName, lastName, email, password });
    await DI.em.persistAndFlush(user);

    return res.json(user);
  },

  updatePassword: async ({ body }: Request, res: Response) => {
    const { password, email } = body;
    const user = await DI.em.findOne(User, { email });
    if (!user) {
      return res.status(404).send('Email does not exist');
    }
    if (!user.hasTempPassword) {
      return res.status(401).send('User with a given email has already set the password!'); // this crashes the app
    }
    user.password = await bcrypt.hash(password, 10);
    user.hasTempPassword = false;
    await DI.em.persistAndFlush(user);

    return res.status(200).json({ success: true });
  }
});
