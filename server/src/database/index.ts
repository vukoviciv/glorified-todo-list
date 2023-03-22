import { Account, Task, User } from './entities';
import { EntityManager, MikroORM } from '@mikro-orm/core';

export interface DIinterface {
  orm: MikroORM,
  em: EntityManager,
  AccountEntity: typeof Account,
  TaskEntity: typeof Task,
  UserEntity: typeof User
}

export async function dbInit() {
  const DI = {} as DIinterface;
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;

  DI.AccountEntity = Account;
  DI.TaskEntity = Task;
  DI.UserEntity = User;

  return DI;
}
