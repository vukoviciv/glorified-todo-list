/* eslint-disable @typescript-eslint/no-explicit-any */
import { Account, Task, taskPriority, User } from '../src/database/entities';
import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';

jest.mock('../src/database/entities');

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
  const deadline = faker.date.future();

  return {
    deadline,
    id: faker.random.alphaNumeric(),
    name: faker.music.songName(),
    description: faker.commerce.productDescription(),
    done: faker.datatype.boolean(),
    priority: getRandomPriority(),
    getDeadlineTime,
    getDeadlineDate,
    ...overrides
  };
};

const buildAccount = () => {
  return {
    id: 1,
    name: faker.name.firstName()
  };
};

const buildDbInit = (emOverrides: any = {}) => {
  return jest.fn().mockImplementation(() => Promise.resolve({
    em: {
      find: jest.fn(),
      findOne: jest.fn(),
      persistAndFlush: jest.fn(),
      flush: jest.fn(),
      remove: jest.fn(() => ({ flush: jest.fn() })),
      ...emOverrides
    },
    AccountEntity: Account,
    TaskEntity: Task,
    UserEntity: User
  }));
};

export {
  buildAccount,
  buildDbInit,
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

function getDeadlineDate(_deadline: Date) {
  const deadline = new Date(_deadline);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const;
  const date = deadline.toLocaleDateString(undefined, options);
  return date;
}

function getDeadlineTime(_deadline: Date) {
  const deadline = new Date(_deadline);
  const options = { hour: '2-digit', minute: '2-digit' } as const;
  const time = deadline.toLocaleTimeString([], options);
  return time;
}
