/**
 * @vitest-environment happy-dom
 */

import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildTask, buildTasks } from './test-utils';
import { getUpdatedList } from './utils';
import tasksApi from '../api/tasks';
import { updateTask } from './actions';

vi.mock('./actions');

describe('actions', () => {
  const initialTask = { // TODO: use build task instead
    id: 91,
    name: 'Initial task',
    description: 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
    done: false,
    deadline: '2023-04-29T08:11:37.571Z',
    priority: 1
  };
  const expectedTask = {
    id: 91,
    name: 'Updated task',
    description: 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
    done: false,
    deadline: '2023-04-29T08:11:37.571Z',
    priority: 1
  };

  it('should update the task via API', async () => {
    tasksApi.update = vi.fn().mockResolvedValue(expectedTask);
    const task = await tasksApi.update(initialTask);
    expect(tasksApi.update).toBeCalledTimes(1);
    expect(task).toEqual(expectedTask);
  });

  it('should update store state with new list containing updated task', () => {
    // TODO: in progress
    const builtTasks = buildTasks(2);
    const initialList = [...builtTasks, initialTask];
    const expectedList = [...builtTasks, expectedTask];

    const state = { tasks: initialList };
    const mockCommit = vi.fn().mockReturnValue(expectedList);

    const fakeUpdate = task => Promise.resolve({
      task: expectedTask
    });
  });
});
