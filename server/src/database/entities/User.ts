import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { Account } from '.';
import { BaseEntity } from './BaseEntity';

type Props = {
  firstName: string,
  lastName: string,
  email: string
}

@Entity()
export class User extends BaseEntity {
  @Property()
    firstName: string;

  @Property()
    lastName: string;

  @Property({ unique: true })
    email: string;

  @OneToMany(() => Account, a => a.user)
    accounts = new Collection<Account>(this);

  @Property({ name: 'fullName' })
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor({ firstName, lastName, email }: Props) {
    super();

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
