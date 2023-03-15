/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from 'vitest';
import { updateTask } from './actions';

describe('actions', () => {
  it('test passing', () => {
    const a = 2;
    expect(a).be.equal(2);
  });
});
