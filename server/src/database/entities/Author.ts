import { Cascade, Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Book } from '.';

@Entity()
export class Author extends BaseEntity {
  @Property()
    name: string;

  @Property()
    email: string;

  @Property({ nullable: true })
    age?: number;

  @Property()
    termsAccepted = false;

  @Property({ nullable: true })
    born?: Date;

  @OneToMany(() => Book, b => b.author, { cascade: [Cascade.ALL] })
    books = new Collection<Book>(this);

  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
  }
}
