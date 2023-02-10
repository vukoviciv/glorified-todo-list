import { expr } from '@mikro-orm/core';

const DESC_ORDER_ATTRS = ['priority'];
const NAME_ATTR = 'name';

const getNameOrderBy = () => ({ [expr('lower(name)')]: 'ASC' });

export function processOrderBy(orderBy: string) {
  const isName = orderBy === NAME_ATTR;
  if (isName) return getNameOrderBy();
  if (DESC_ORDER_ATTRS.includes(orderBy)) return { [orderBy]: 'DESC' };

  return { [orderBy]: 'ASC' };
}
