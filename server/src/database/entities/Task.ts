import { endOfToday, startOfToday } from 'date-fns';
import { Entity, Enum, Filter, ManyToOne, Property } from '@mikro-orm/core';
import { getDeadlineDate, getDeadlineTime } from '../utils/deadline';
import { Account } from '.';
import { BaseEntity } from './BaseEntity';
import { ValuesType } from 'utility-types';

export const taskPriority = {
  HIGH: 1,
  MEDIUM: 0,
  LOW: -1
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
@Filter({
  name: 'todaysTask',
  cond: () => {
    const start = startOfToday();
    const end = endOfToday();
    return { deadline: { $lt: end, $gt: start } };
  }
})
export class Task extends BaseEntity {
  @Property()
    name: string;

  @Property({ nullable: true })
    description?: string;

  @ManyToOne(() => Account)
    account: Account;

  @Property()
    done?: boolean = false;

  @Property({ nullable: true })
    deadline?: Date;

  @Enum()
    priority?: TaskPriority = taskPriority.MEDIUM;

  @Property({ name: 'deadlineDate' })
  getDeadlineDate() {
    return getDeadlineDate(this.deadline);
  }

  @Property({ name: 'deadlineTime' })
  getDeadlineTime() {
    return getDeadlineTime(this.deadline);
  }

  constructor({ name, account, ...props }: Props) {
    super();

    this.name = name;
    this.account = account;

    if (props) Object.assign(this, props);
  }
}
