import { Task, taskPriority } from './Task';
import { Account } from './Account';
import { User } from './User';

const entities = [Account, User, Task];

export {
  Account,
  entities,
  User,
  Task,
  taskPriority
};
