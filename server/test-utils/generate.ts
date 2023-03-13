import { Request, Response } from 'express';

type ResOverrides = {
  headersSent?: true
}

const buildRes = (overrides: ResOverrides = {}): Response => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(() => res),
    ...overrides
  } as unknown as Response;

  return res;
};

const buildReq = () => {
  return {} as Request;
};

const buildNext = () => {
  return jest.fn();
};

export {
  buildNext,
  buildReq,
  buildRes
};
