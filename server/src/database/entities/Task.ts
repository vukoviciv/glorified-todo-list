/* eslint-disable no-unused-vars */
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { Account } from '.';
import { BaseEntity } from './BaseEntity';

export enum TaskPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

type ConstructorProps = {
  name: string,
  description?: string,
  account: Account,
  done?: boolean,
  deadline?: Date,
  priority?: string // TODO: fix this, should be enum
}

@Entity()
export class Task extends BaseEntity {
  @Property()
    name!: string;

  @Property()
    description?: string;

  @ManyToOne()
    account!: Account;

  @Property()
    done = false;

  @Property({ nullable: true })
    deadline?: Date;

  @Enum(() => TaskPriority)
    priority = TaskPriority.MEDIUM;

  constructor(props: ConstructorProps) {
    super();
    Object.assign(this, props);
  }
}
