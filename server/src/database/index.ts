import { Account, Task, User } from './entities';
import { EntityManager, MikroORM } from '@mikro-orm/core';

export interface DIinterface {
  orm: MikroORM,
  em: EntityManager,
  AccountEntity: typeof Account,
  TaskEntity: typeof Task,
  UserEntity: typeof User
}

export const DI = {} as DIinterface; // TODO: remove export

export async function dbInit() {
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;

  DI.AccountEntity = Account;
  DI.TaskEntity = Task;
  DI.UserEntity = User;

  return DI;
}
