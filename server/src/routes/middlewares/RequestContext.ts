import { NextFunction, Request, Response } from 'express';
import { DI } from '../../database/index';
import { RequestContext } from '@mikro-orm/core';

export function requestContextMiddleware(_req: Request, _res: Response, next: NextFunction) {
  RequestContext.create(DI.em, next);
}
