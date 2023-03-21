import { Request, Response } from 'express';

const buildRes = (overrides = {}): Response => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(() => res),
    ...overrides
  } as unknown as Response;

  return res;
};

const buildReq = () => {
  return { body: {} } as Request;
};

const buildNext = () => {
  return jest.fn();
};

export {
  buildNext,
  buildReq,
  buildRes
};
