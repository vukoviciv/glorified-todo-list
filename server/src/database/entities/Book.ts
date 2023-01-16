import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Author } from './index';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Book extends BaseEntity {
  @Property()
    title: string;

  @ManyToOne()
    author: Author;

  @Property({ nullable: true })
    metaObject?: object;

  constructor(title: string, author: Author) {
    super();
    this.title = title;
    this.author = author;
  }
}
