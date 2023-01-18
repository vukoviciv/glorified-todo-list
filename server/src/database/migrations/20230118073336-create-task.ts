/* eslint-disable no-unused-vars */
import { Migration } from '@mikro-orm/migrations';

enum TaskPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}
const TABLE_NAME = 'task';
const priorities = Object.values(TaskPriority);

export class Migration20230118073336 extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();
    this.addSql(
      knex.schema.createTable(TABLE_NAME, table => {
        table.increments();
        table.string('name');
        table.string('description');
        table.integer('account_id');
        table.foreign('account_id')
          .references('id')
          .inTable('account');
        table.boolean('done');
        table.dateTime('deadline');
        table.enum('priority', priorities);
        table.timestamps();
      }).toQuery()
    );
  }

  async down(): Promise<void> {
    const knex = this.getKnex();
    this.addSql(
      knex.schema
        .dropTable(TABLE_NAME)
        .toQuery()
    );
  }
}
