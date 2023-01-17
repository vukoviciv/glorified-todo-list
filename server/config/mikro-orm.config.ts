import { Author, Book } from './../src/database/entities';
import { Options } from '@mikro-orm/core';

const options: Options = {
  entities: [Author, Book],
  type: 'postgresql',
  dbName: 'my-todo-list',
  debug: true,
  clientUrl: 'postgres://:@localhost:5432/my-todo-list'
};

export default options;
