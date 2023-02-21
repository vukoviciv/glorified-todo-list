import { faker } from '@faker-js/faker';
import { Migration } from '@mikro-orm/migrations';
import { User } from '../entities/index';

const TABLE_NAME = 'user';
const PASSWORD = 'password';
const DEFAULT_PASSWORD = '1234';
const HAS_TEMP_PASSWORD = 'has_temp_password';

export class Migration20230221070616 extends Migration {
  knex = this.getKnex();

  async up(): Promise<void> {
    this.addColumns();
    const users = await this.execute(
      this.knex.select('id', PASSWORD).from(TABLE_NAME)
    );
    this.addTempPasswordToExistingUsers(users);
  }

  async down(): Promise<void> {
    this.addSql(
      this.knex.schema.alterTable(TABLE_NAME, table => {
        table.dropColumns(PASSWORD, HAS_TEMP_PASSWORD);
      }).toQuery()
    );
  }

  addTempPasswordToExistingUsers(users: Partial<User>[]) {
    users.forEach(user => {
      const tempPass = faker.random.alpha(20);
      this.addSql(
        this.knex(TABLE_NAME)
          .where('id', user.id)
          .update({ [PASSWORD]: tempPass })
      );
    });
  }

  addColumns() {
    this.execute(
      this.knex.schema.alterTable(TABLE_NAME, table => {
        table.string(PASSWORD).notNullable().defaultTo(DEFAULT_PASSWORD);
        table.boolean(HAS_TEMP_PASSWORD).defaultTo(true);
      }).toQuery()
    );
  }
}
