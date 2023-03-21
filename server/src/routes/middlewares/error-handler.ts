import { NextFunction, Request, Response } from 'express';

export function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    next(error);
  } else {
    res.status(500);
    res.json({
      message: error.message,
      ...(process.env.NODE_ENV === 'production' ? null : { stack: error.stack })
    });
  }
}
