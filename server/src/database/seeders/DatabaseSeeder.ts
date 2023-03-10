import { Account, User } from '../entities';
import { AccountFactory, TaskFactory, UserFactory } from './Factories';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class DatabaseSeeder extends Seeder {
  #accountCount = 2;
  #taskCount = 10;
  #userCount = 5;

  async run(em: EntityManager): Promise<void> {
    const users = new UserFactory(em).each(user => {
      this.setAccountsWithTasks(user, em);
    }).make(this.#userCount);

    await em.persistAndFlush(users);
  }

  setAccountsWithTasks(user: User, em: EntityManager) {
    user.accounts.set(new AccountFactory(em).each(account => {
      this.setTasks(account, em);
    }).make(this.#accountCount));
  }

  setTasks(account: Account, em: EntityManager) {
    account.tasks.set(new TaskFactory(em).make(this.#taskCount));
  }
}
