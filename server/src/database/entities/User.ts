import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { Account } from '.';
import { BaseEntity } from './BaseEntity';

type ConstructorProps = {
  firstName: string,
  lastName: string
}

@Entity()
export class User extends BaseEntity {
  @Property()
    firstName!: string;

  @Property()
    lastName!: string;

  @OneToMany(() => Account, a => a.user)
    accounts = new Collection<Account>(this);

  constructor(props: ConstructorProps) {
    super();
    Object.assign(this, props);
  }
}
