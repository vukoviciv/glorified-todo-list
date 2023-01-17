import { Account, Task, User } from './entities';
import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core';

export const DI = {} as {
  orm: MikroORM,
  em: EntityManager,
  accountRepository: EntityRepository<Account>, // cleanup (automatize)
  taskRepository: EntityRepository<Task>,
  userRepository: EntityRepository<User>
};

async function init() {
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;
  DI.accountRepository = DI.orm.em.getRepository(Account);
  DI.taskRepository = DI.orm.em.getRepository(Task);
  DI.userRepository = DI.orm.em.getRepository(User);
}

export default {
  init
};
