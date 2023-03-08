import { BeforeCreate, Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { Account } from '.';
import { BaseEntity } from './BaseEntity';
import bcrypt from 'bcrypt';

type Props = {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

@Entity()
export class User extends BaseEntity {
  @Property()
    firstName: string;

  @Property()
    lastName: string;

  @Property({ unique: true })
    email: string;

  @Property({ hidden: true })
    password: string;

  @Property()
    hasTempPassword?: boolean = false;

  @OneToMany(() => Account, a => a.user)
    accounts = new Collection<Account>(this);

  @Property({ name: 'fullName' })
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @BeforeCreate()
  async beforeCreate() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  constructor({ firstName, lastName, email, password }: Props) {
    super();

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
