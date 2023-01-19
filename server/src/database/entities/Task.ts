/* eslint-disable no-unused-vars */
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
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

  @ManyToOne()
    account: Account;

  @Property()
    done = false;

  @Property({ nullable: true })
    deadline?: Date;

  @Enum(() => TaskPriority)
    priority = TaskPriority.MEDIUM;

  constructor(name: string, description: string, account: Account) {
    super();
    this.name = name;
    this.description = description;
    this.account = account;
  }
}
