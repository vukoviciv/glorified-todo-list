import { Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { Task, User } from '.';
import { BaseEntity } from './BaseEntity';

type Props = {
  name: string,
  user: User,
}

@Entity()
export class Account extends BaseEntity {
  @Property()
    name: string;

  @ManyToOne(() => User)
    user: User;

  @OneToMany(() => Task, t => t.account)
    tasks = new Collection<Task>(this);

  constructor({ name, user }: Props) {
    super();

    this.name = name;
    this.user = user;
  }
}
