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

type OptionalProps = {
  description?: string,
  deadline?: Date,
  priority?: TaskPriority,
  done?: boolean
}

type Props = {
  name: string,
  account: Account
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

  constructor(props: Props, optionalProps: OptionalProps = {}) {
    super();
    const { name, account } = props;

    this.name = name;
    this.account = account;

    if (optionalProps) Object.assign(this, optionalProps);
  }
}
