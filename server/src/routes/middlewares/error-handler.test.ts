import { buildNext, buildReq, buildRes } from './test-utils/generate';
import { errorMiddleware } from './error-handler';

test('calls next if headerSent is true', () => {
  const req = buildReq();
  const next = buildNext();
  const error = new Error('trrrr');
  const res = buildRes({ headersSent: true });

  errorMiddleware(error, req, res, next);
  expect(next).toHaveBeenCalledWith(error);
  expect(next).toHaveBeenCalledTimes(1);
  expect(res.status).not.toHaveBeenCalled();
  expect(res.json).not.toHaveBeenCalled();
});

test('responds with 500 and the error object', () => {
  const message = 'Some message';
  const req = buildReq();
  const next = buildNext();
  const error = new Error(message);
  const res = buildRes();

  errorMiddleware(error, req, res, next);
  expect(next).not.toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({
    message,
    stack: error.stack
  });
  expect(res.json).toHaveBeenCalledTimes(1);
});
