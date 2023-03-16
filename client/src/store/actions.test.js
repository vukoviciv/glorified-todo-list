/**
 * @vitest-environment happy-dom
 */

import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildTask, buildTasks } from './test-utils';
import { faker } from '@faker-js/faker';
import { getUpdatedList } from './utils';
import tasksApi from '../api/tasks';
import { updateTask } from './actions';

vi.mock('../api/tasks');
const taskUpdate = tasksApi.update;

afterEach(() => {
  vi.restoreAllMocks();
});

describe('actions', () => {
  it('should update task', () => {
    const tasksCount = 2;
    const commit = sinon.spy();
    const task = buildTask();
    const initialTasks = buildTasks(tasksCount);
    const existingTasks = [...initialTasks, task];
    console.log({ existingTasks });
    const state = { tasks: existingTasks };

    const newName = faker.music.songName();
    const updatedTask = Object.assign({}, task, { name: newName, priority: 1 });
    console.log({ updatedTask });

    taskUpdate.mockResolvedValue(updatedTask);
    // state.tasks = getUpdatedList
    updateTask({ commit, state }, updatedTask);
    expect();
  });
});
