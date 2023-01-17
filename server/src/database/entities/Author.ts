import { Cascade, Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Book } from './Book';

@Entity()
export class Author extends BaseEntity {
  @Property()
    name: string;

  @Property()
    email: string;

  @Property({ nullable: true })
    age?: number;

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
