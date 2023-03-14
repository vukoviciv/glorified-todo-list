import * as getters from './getters';
import { beforeEach, describe, expect, it } from 'vitest';
import { buildTasks, buildUser } from './test-utils';

const { getAccounts, getDoneTasks, getPendingTasks } = getters;
let state;

describe('getters', () => {
  beforeEach(() => {
    state = {};
  });

  const doneCount = 2;
  const pendingCount = 2;
  const doneTasks = buildTasks(doneCount, { done: true });
  const pendingTasks = buildTasks(pendingCount, { done: false });
  const user = buildUser(2);

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

  it('getAccounts returns accounts', () => {
    state.user = user;
    expect(getAccounts(state)).to.deep.equal(state.user.accounts);
  });
  it('getAccounts returns null for no user', () => {
    state.user = null;
    expect(getAccounts(state)).to.deep.equal(undefined);
  });
});
