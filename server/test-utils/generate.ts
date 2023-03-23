import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import { taskPriority } from '../src/database/entities';

const buildRes = (overrides = {}): Response => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(() => res),
    ...overrides
  } as unknown as Response;

  return res;
};

const buildReq = (body = {}) => {
  return { body } as Request;
};

const buildNext = () => {
  return jest.fn();
};

const buildUser = (existingAccounts = ['one', 'two']) => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLocaleLowerCase(),
    hasTempPassword: false,
    password: '123456',
    accounts: {
      add: () => jest.fn().mockResolvedValue(existingAccounts)
    }
  };
};

const buildTask = (overrides = {}) => {
  return {
    name: faker.music.songName(),
    description: faker.commerce.productDescription(),
    done: faker.datatype.boolean(),
    deadline: faker.date.future(),
    priority: getRandomPriority(),
    ...overrides
  };
};

const buildAccount = () => {
  return {
    id: 1,
    name: faker.name.firstName()
  };
};

export {
  buildAccount,
  buildNext,
  buildReq,
  buildRes,
  buildUser,
  buildTask
};

function getRandomPriority() {
  const priorities = Object.values(taskPriority);
  const randomIndex = Math.floor(Math.random() * priorities.length);
  return priorities[randomIndex];
}
