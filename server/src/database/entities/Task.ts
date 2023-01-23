import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { Account } from '.';
import { BaseEntity } from './BaseEntity';

export enum TaskPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

type OptionalProps = {
  description?: string,
  deadline?: Date,
  priority?: TaskPriority
}

type ConstructorProps = {
  name: string,
  account: Account,
  done: boolean
}

@Entity()
export class Task extends BaseEntity {
  @Property()
    name: string;

  @Property()
    description?: string;

  @ManyToOne()
    account: Account;

  @Property({ default: false })
    done?: boolean;

  @Property()
    deadline?: Date;

  @Enum({ items: () => TaskPriority, default: TaskPriority.MEDIUM })
    priority?: TaskPriority;

  constructor(props: ConstructorProps, optionalProps: OptionalProps = {}) {
    super();
    const { name, account, done } = props;

    this.name = name;
    this.account = account;
    this.done = done;

    if (optionalProps) {
      const { description, deadline, priority } = optionalProps;

      this.description = description;
      this.deadline = deadline;
      this.priority = priority;
    }
  }
}
