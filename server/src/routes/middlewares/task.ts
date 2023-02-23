import { NextFunction, Request, Response } from 'express';

export function parseParamId(req: Request, _res: Response, next: NextFunction, id: string) {
  const parsedId = parseInt(id);
  if (Number.isNaN(parsedId)) throw new Error('ID is not an integer!');

  req.body.parsedId = parsedId;
  next();
}
