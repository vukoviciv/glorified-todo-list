import { Migration } from '@mikro-orm/migrations';

const taskPriority = {
  HIGH: 1,
  MEDIUM: 0,
  LOW: -1
} as const;

const reversePriority = {
  '-1': 'LOW',
  0: 'MEDIUM',
  1: 'HIGH'
} as const;

const PRIORITIES_OLD = ['HIGH', 'MEDIUM', 'LOW'];
const DEFAULT_OLD = 'MEDIUM';
const PRIORITIES_NEW = [-1, 0, 1];
const DEFAULT_NEW = 0;
const TABLE_NAME = 'task';

export class Migration20230130105713 extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();
    // dodaj lvl temp kolonu
    this.addSql(
      knex.schema.alterTable(TABLE_NAME, table => {
        table.enum('priority_lvl', PRIORITIES_NEW).defaultTo(DEFAULT_NEW);
      }).toQuery()
    );
    // dohvati sve taskove
    const tasks = await this.execute(knex.select('id', 'priority').from(TABLE_NAME));
    console.log('before: ');
    console.log({ tasks });
    // update taskova: u novu ubaci stare podatke namapirano
    tasks.forEach(task => {
      this.addSql(
        knex(TABLE_NAME)
          .where('id', task.id)
          .update({
            priority_lvl: taskPriority[task.priority as keyof typeof taskPriority]
          })
      );
    });
    console.log('AFTER: ');
    console.log({ tasks });
    this.addSql(
      knex.schema.alterTable(TABLE_NAME, table => {
        table.dropColumn('priority');
      }).toQuery()
    );
    this.addSql(
      knex.schema.alterTable(TABLE_NAME, table => {
        table.renameColumn('priority_lvl', 'priority');
      }).toQuery()
    );
  }

  async down(): Promise<void> {
    const knex = this.getKnex();
    // ADD novu temp kolonu
    this.addSql(
      knex.schema.alterTable(TABLE_NAME, table => {
        table.enum('temp', PRIORITIES_OLD).defaultTo(DEFAULT_OLD);
      }).toQuery()
    );
    const tasks = await this.execute(knex.select('id', 'priority').from(TABLE_NAME));
    console.log({ tasks });

    // ubaci podatke u temp kolonu
    tasks.forEach(task => {
      this.addSql(
        knex(TABLE_NAME)
          .where('id', task.id)
          .update({
            temp: reversePriority[task.priority as keyof typeof reversePriority]
          })
      );
    });
    // izbrisi staru invalidnu kolonu
    this.addSql(
      knex.schema.alterTable(TABLE_NAME, table => {
        table.dropColumn('priority');
      }).toQuery()
    );
    // novu preimeunuj u staru
    this.addSql(
      knex.schema.alterTable(TABLE_NAME, table => {
        table.renameColumn('temp', 'priority');
      }).toQuery()
    );
  }
}
