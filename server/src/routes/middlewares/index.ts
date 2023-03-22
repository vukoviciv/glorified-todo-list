import cookieParser from 'cookie-parser';
import { createRequestContextMw } from './requestContext';
import { DIinterface } from '../../database';
import express from 'express';

export default function createMiddlewares(DI: DIinterface) {
  const { requestContextMiddleware } = createRequestContextMw(DI);

  return [
    cookieParser(),
    express.json(),
    requestContextMiddleware
  ];
}

export * from './task';
