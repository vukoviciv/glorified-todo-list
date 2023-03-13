import { Response } from 'express';

type Overrides = {
  headersSent?: true
}

const buildRes = (overrides: Overrides = {}): Response => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(() => res),
    ...overrides
  } as unknown as Response;

  return res;
};

export { buildRes };
