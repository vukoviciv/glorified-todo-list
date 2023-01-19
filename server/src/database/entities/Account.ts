import { Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { Task, User } from './index';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Account extends BaseEntity {
  @Property()
    name: string;

  @ManyToOne(() => User)
    user: User;

  @OneToMany(() => Task, t => t.account)
    tasks = new Collection<Task>(this);

  constructor(name: string, user: User) {
    super();
    this.name = name;
    this.user = user;
  }
}
