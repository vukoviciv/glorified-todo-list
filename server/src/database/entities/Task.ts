import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { Account } from './index';
import { BaseEntity } from './BaseEntity';

export enum TaskPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
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

  @Enum(() => TaskPriority)
    priority!: TaskPriority.MEDIUM; // is this default value for enums?

  constructor(name: string, description: string, account: Account, done: boolean) {
    super();
    this.name = name;
    this.description = description;
    this.account = account;
    this.done = done;
  }
}
