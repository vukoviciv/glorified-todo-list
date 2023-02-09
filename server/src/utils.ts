import { expr } from '@mikro-orm/core';
import { ParsedQs } from 'qs';

type OrderBy = string | ParsedQs | string[] | ParsedQs[];

export function getNameOrderBy() {
  return { [expr('lower(name)')]: 'ASC' };
}

export function processOrderBy(orderBy: OrderBy) {
  const hasName = Object.keys(orderBy).includes('name');
  return hasName ? getNameOrderBy() : orderBy;
}
