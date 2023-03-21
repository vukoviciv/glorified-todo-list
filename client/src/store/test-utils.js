import { faker } from '@faker-js/faker';

export const buildTasks = (number = 10, overrides = {}) => {
  const tasks = [];
  for (let i = 0; i < number; i++) {
    tasks.push(buildTask(overrides));
  }

  return tasks;
};

export const buildUserWithAccounts = (accountsCount = 2) => {
  const accounts = buildAccounts(accountsCount);

  return {
    accounts,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLocaleLowerCase(),
    hasTempPassword: false,
    password: '123456'
  };
};

export function buildAccounts(accountCount) {
  const accounts = [];
  for (let i = 0; i < accountCount; i++) {
    accounts.push({ name: faker.random.word() });
  }

  return accounts;
}

export function buildTask(overrides = {}) {
  return {
    id: faker.datatype.number(100),
    name: faker.music.songName(),
    description: faker.commerce.productDescription(),
    done: faker.datatype.boolean(),
    deadline: faker.date.future(),
    priority: getRandomPriority(),
    ...overrides
  };
}

function getRandomPriority() {
  const taskPriority = {
    HIGH: 1,
    MEDIUM: 0,
    LOW: -1
  };
  const priorities = Object.values(taskPriority);
  const randomIndex = Math.floor(Math.random() * priorities.length);

  return priorities[randomIndex];
}
