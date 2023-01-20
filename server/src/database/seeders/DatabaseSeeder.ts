import { AccountFactory, TaskFactory, UserFactory } from './Factories';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const users = new UserFactory(em).each(user => {
      user.accounts.set(new AccountFactory(em).each(account => {
        account.tasks.set(new TaskFactory(em).make(20));
      }).make(3));
    }).make(2);
    em.persist(users);
  }
}
