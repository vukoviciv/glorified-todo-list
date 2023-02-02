import { Account, User } from '../entities';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { TaskFactory } from './factories';

export class TaskSeeder extends Seeder {
  #taskCount = 20;

  async run(em: EntityManager): Promise<void> {
    const users = await em.find(User, {});
    const user = users.pop();
    if (!user) throw new Error('No users in the database!');
    console.log(`For user: ${user.firstName} ${user.lastName} (ID: ${user.id})`);

    const accounts = await em.find(Account, { user });
    const account = accounts.pop();
    if (!account) throw new Error('No accounts in the database!');
    console.log(`For account: ${account.name} (ID: ${account.id})`);

    account.tasks.set(new TaskFactory(em).make(this.#taskCount));
    console.log(`${this.#taskCount} tasks successfully created!`);
    await em.persistAndFlush(account);
  }
}
