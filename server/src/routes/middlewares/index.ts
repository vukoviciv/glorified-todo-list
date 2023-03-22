import cookieParser from 'cookie-parser';
import { createRequestContextMw } from './requestContext';
import { DIinterface } from '../../database';
import express from 'express';

export default function initMiddlewares(DI: DIinterface) {
  const { requestContextMiddleware } = createRequestContextMw(DI);

  return [
    cookieParser(),
    express.json(),
    requestContextMiddleware
  ];
}

export * from './task';
