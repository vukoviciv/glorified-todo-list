import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'user';

export class Migration20230117143707 extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();
    this.addSql(
      knex.schema.createTable(TABLE_NAME, table => {
        table.increments();
        table.string('first_name');
        table.string('last_name');
        table.string('email').notNullable().unique();
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
