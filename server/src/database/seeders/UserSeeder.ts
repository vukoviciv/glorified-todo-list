import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserFactory } from './Factories';

export class UserSeeder extends Seeder {
  #userCount = 5;

  async run(em: EntityManager): Promise<void> {
    const users = new UserFactory(em).make(this.#userCount);

    await em.persistAndFlush(users);
  }
}
