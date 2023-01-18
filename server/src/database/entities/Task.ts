/* eslint-disable no-unused-vars */
import { DateType, Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { Account } from './index';
import { BaseEntity } from './BaseEntity';

export enum TaskPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

@Entity()
export class Task extends BaseEntity {
  @Property()
    name: string;

  @Property()
    description: string;

  @ManyToOne({ type: 'Account' })
    account: Account;

  @Property({ default: false })
    done?: boolean;

  @Property({ type: DateType })
    deadline: DateType;

  @Enum(() => TaskPriority)
    priority!: TaskPriority.MEDIUM; // is this default value for enums?

  constructor(name: string, description: string, account: Account, done: boolean,
    deadline: DateType) {
    super();
    this.name = name;
    this.description = description;
    this.account = account;
    this.done = done;
    this.deadline = deadline;
  }
}
