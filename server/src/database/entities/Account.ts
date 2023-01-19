import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { User } from './index';

@Entity()
export class Account extends BaseEntity {
  @Property()
    name: string;

  @ManyToOne(() => User)
    user: User;

  constructor(name: string, user: User) {
    super();
    this.name = name;
    this.user = user;
  }
}
