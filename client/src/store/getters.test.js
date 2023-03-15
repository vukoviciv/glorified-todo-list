import * as getters from './getters';
import { beforeEach, describe, expect, it } from 'vitest';
import { buildTasks, buildUserWithAccounts } from './test-utils';

const { getAccounts, getDoneTasks, getPendingTasks } = getters;
let state;

describe('getters', () => {
  beforeEach(() => {
    state = {};
  });

  const doneCount = 2;
  const pendingCount = 2;
  const accountsCount = 2;
  const doneTasks = buildTasks(doneCount, { done: true });
  const pendingTasks = buildTasks(pendingCount, { done: false });
  const user = buildUserWithAccounts(accountsCount);

  it('should return done tasks if they exist', () => {
    state.tasks = [...doneTasks, ...pendingTasks];
    expect(getDoneTasks(state)).to.deep.equal(doneTasks);

    state.tasks = [];
    expect(getDoneTasks(state)).toEqual([]);
  });

  it('should return pending tasks if they exist', () => {
    state.tasks = [...doneTasks, ...pendingTasks];
    expect(getPendingTasks(state)).to.deep.equal(pendingTasks);

    state.tasks = [];
    expect(getPendingTasks(state)).toEqual([]);
  });

  it('should return accounts for user if they exist', () => {
    state.user = user;
    expect(getAccounts(state)).toEqual(state.user.accounts);

    state.user = { accounts: [] };
    expect(getAccounts(state)).toEqual([]);

    state.user = null;
    expect(getAccounts(state)).toEqual(undefined);
  });
});
