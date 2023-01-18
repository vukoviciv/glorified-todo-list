import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { User } from './index';

@Entity()
export class Account extends BaseEntity {
  @Property()
    name: string;

  @ManyToOne({ type: 'User', primary: true })
    user?: User;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
