import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'account';

export class Migration20230118063447 extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();
    this.addSql(
      knex.schema.createTable(TABLE_NAME, table => {
        table.increments();
        table.string('name');
        table.integer('user_id');
        table.foreign('user_id')
          .references('id')
          .inTable('user');
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
