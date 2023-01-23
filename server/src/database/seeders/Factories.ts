import { Account, Task, TaskPriority, User } from '../entities/index';
import { Factory, Faker } from '@mikro-orm/seeder';

export class TaskFactory extends Factory<Task> {
  model = Task;

  definition(faker: Faker): Partial<Task> {
    return {
      name: faker.music.songName(),
      description: faker.commerce.productDescription(),
      done: faker.datatype.boolean(),
      deadline: faker.date.future(),
      priority: TaskPriority.MEDIUM
    };
  }
}

export class UserFactory extends Factory<User> {
  model = User;

  definition(faker: Faker): Partial<User> {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    };
  }
}

export class AccountFactory extends Factory<Account> {
  model = Account;

  definition(faker: Faker): Partial<Account> {
    return {
      name: faker.random.word()
    };
  }
}
