import { NextFunction, Request, Response } from 'express';
import { DIinterface } from '../../database/index';
import { RequestContext } from '@mikro-orm/core';

export const createRequestContextMw = (DI: DIinterface) => ({
  requestContextMiddleware: (_req: Request, _res: Response, next: NextFunction) => {
    RequestContext.create(DI.em, next);
  }
});
