import { Author, Book } from './entities';
import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core';

export const DI = {} as {
  orm: MikroORM,
  em: EntityManager,
  authorRepository: EntityRepository<Author>,
  bookRepository: EntityRepository<Book>
};

async function init() {
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;
  DI.authorRepository = DI.orm.em.getRepository(Author);
  DI.bookRepository = DI.orm.em.getRepository(Book);
}

export default {
  init
};
