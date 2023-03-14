import * as getters from './getters';
import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

const { getDoneTasks, getPendingTasks } = getters;
let state;

describe('getters', () => {
  beforeEach(() => {
    state = {};
  });
  const doneCount = 2;
  const pendingCount = 2;
  const doneTasks = buildTasks(doneCount, { done: true });
  const pendingTasks = buildTasks(pendingCount, { done: false });

  // mocked state
  it('getDoneTasks returns done tasks', () => {
    state.tasks = [...doneTasks, ...pendingTasks];
    expect(getDoneTasks(state)).to.deep.equal(doneTasks);
  });
  it('getPendingTasks returns pending tasks', () => {
    state.tasks = [...doneTasks, ...pendingTasks];
    expect(getPendingTasks(state)).to.deep.equal(pendingTasks);
  });

  // mocked state
  it('getDoneTasks returns empty array', () => {
    state.tasks = [];
    expect(getDoneTasks(state)).to.deep.equal([]);
  });
  it('getPendingTasks returns empty array', () => {
    state.tasks = [];
    expect(getPendingTasks(state)).to.deep.equal([]);
  });
});

function buildTasks(number, overrides = {}) {
  const tasks = [];
  for (let i = 0; i < number; i++) {
    tasks.push(buildTask(overrides));
  }

  return tasks;
}

function buildTask(overrides = {}) {
  return {
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
