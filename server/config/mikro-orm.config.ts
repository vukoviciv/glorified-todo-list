import * as entities from './../src/database/entities';
import { Options } from '@mikro-orm/core';

const options: Options = {
  entities,
  type: 'postgresql',
  dbName: 'my-todo-list',
  debug: true
};

export default options;
