import * as getters from './getters';
import { beforeEach, describe, expect, it } from 'vitest';
import { buildTasks } from './test-utils';

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

  it('getDoneTasks returns done tasks', () => {
    state.tasks = [...doneTasks, ...pendingTasks];
    expect(getDoneTasks(state)).to.deep.equal(doneTasks);
  });
  it('getPendingTasks returns pending tasks', () => {
    state.tasks = [...doneTasks, ...pendingTasks];
    expect(getPendingTasks(state)).to.deep.equal(pendingTasks);
  });

  it('getDoneTasks returns empty array', () => {
    state.tasks = [];
    expect(getDoneTasks(state)).to.deep.equal([]);
  });
  it('getPendingTasks returns empty array', () => {
    state.tasks = [];
    expect(getPendingTasks(state)).to.deep.equal([]);
  });
});
