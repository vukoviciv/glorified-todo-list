import { EntityManager, MikroORM } from '@mikro-orm/core';

export const DI = {} as {
  orm: MikroORM,
  em: EntityManager
};

async function init() {
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;
}

export default {
  init
};
