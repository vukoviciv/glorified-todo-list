import { Migration } from '@mikro-orm/migrations';

export class Migration20230117143707 extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();
    this.addSql(
      knex.schema.createTable('user', table => {
        table.increments();
        table.string('first_name');
        table.string('last_name');
        table.timestamps();
      }).toQuery()
    );
  }

  async down(): Promise<void> {
    const knex = this.getKnex();
    this.addSql(
      knex.schema
        .dropTable('user')
        .toQuery()
    );
  }
}
