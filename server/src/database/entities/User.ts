import { Cascade, Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { Account } from './index';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {
  @Property()
    firstName: string;

  @Property()
    lastName: string;

  @OneToMany(() => Account, account => account.user, { cascade: [Cascade.ALL] })
    accounts = new Collection<Account>(this);

  constructor(firstName: string, lastName: string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
