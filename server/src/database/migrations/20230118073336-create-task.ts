import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'task';
const PRIORITIES = ['HIGH', 'MEDIUM', 'LOW'];
const DEFAULT_PRIORITY = 'MEDIUM';
const DEFAULT_DONE = false;

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
        table.boolean('done').defaultTo(DEFAULT_DONE);
        table.dateTime('deadline');
        table.enum('priority', PRIORITIES).defaultTo(DEFAULT_PRIORITY);
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
