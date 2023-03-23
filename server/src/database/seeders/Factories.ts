import { Account, Task, taskPriority, User } from '../entities';
import { Factory, Faker } from '@mikro-orm/seeder';

export class TaskFactory extends Factory<Task> {
  model = Task;

  definition(faker: Faker): Partial<Task> {
    return {
      name: faker.music.songName(),
      description: faker.commerce.productDescription(),
      done: faker.datatype.boolean(),
      deadline: faker.date.future(),
      priority: this.getRandomPriority()
    };
  }

  getRandomPriority() {
    const priorities = Object.values(taskPriority);
    const randomIndex = Math.floor(Math.random() * priorities.length);
    return priorities[randomIndex];
  }
}

export class UserFactory extends Factory<User> {
  model = User;

  definition(faker: Faker): Partial<User> {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email().toLocaleLowerCase(),
      hasTempPassword: false,
      password: '123456'
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
