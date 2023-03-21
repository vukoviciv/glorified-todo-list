import * as mutations from './mutations';
import { beforeAll, describe, expect, it } from 'vitest';
import { buildAccounts, buildTasks, buildUserWithAccounts } from './test-utils';

const { setActiveAccount, setTasks, setUser } = mutations;
let state;
let user;
let tasks;
let activeAccount;

describe('mutations', () => {
  beforeAll(() => {
    user = buildUserWithAccounts();
    activeAccount = buildAccounts(1)[0];
    tasks = buildTasks();
    state = { user, tasks, activeAccount };
  });

  it('should set user', () => {
    setUser(user);
    expect(state.user).to.deep.equal(user);
  });

  it('should set tasks', () => {
    setTasks(tasks);
    expect(state.tasks).to.deep.equal(tasks);
  });

  it('should set activeAccount', () => {
    setActiveAccount(activeAccount);
    expect(state.activeAccount).to.deep.equal(activeAccount);
  });
});
