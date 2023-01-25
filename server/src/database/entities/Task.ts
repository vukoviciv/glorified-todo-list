import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { Account } from '.';
import { BaseEntity } from './BaseEntity';
import { ValuesType } from 'utility-types';

export const taskPriority = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW'
} as const;

type TaskPriority = ValuesType<typeof taskPriority>;

type Props = {
  name: string,
  account: Account,
  description?: string,
  deadline?: Date,
  priority?: TaskPriority,
  done?: boolean
}

@Entity()
export class Task extends BaseEntity {
  @Property()
    name: string;

  @Property({ nullable: true })
    description?: string;

  @ManyToOne()
    account: Account;

  @Property()
    done?: boolean = false;

  @Property({ nullable: true })
    deadline?: Date;

  @Enum()
    priority?: TaskPriority;

  constructor({ name, account, ...props }: Props) {
    super();

    this.name = name;
    this.account = account;

    if (props) Object.assign(this, props);
  }
}
