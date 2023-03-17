import { EntityManager, MikroORM } from '@mikro-orm/core';

export interface DIinterface {
  orm: MikroORM,
  em: EntityManager
}

export const DI = {} as DIinterface;

async function init() {
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;

  return DI;
}

export default {
  init
};
