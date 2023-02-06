import { Request, Response } from 'express';

async function login(req: Request, res: Response) {
  return res.json('logged in');
}

async function logout(req: Request, res: Response) {
  return res.json('logged out');
}

export { login, logout };
