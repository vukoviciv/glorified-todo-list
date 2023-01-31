import type { Knex } from '@mikro-orm/knex';
import { Migration } from '@mikro-orm/migrations';
import { Task } from '../entities/index';

const TABLE_NAME = 'task';
const COLUMN_NAME = 'priority';
const TEMP_COLUMN_NAME = 'temp';

type PriorityNew = {
  HIGH: number,
  MEDIUM: number,
  LOW: number
}
type PriorityOld = {
  '-1': string,
  0: string,
  1: string
}
const priorityNew: PriorityNew = {
  HIGH: 1,
  MEDIUM: 0,
  LOW: -1
};
const priorityOld: PriorityOld = {
  '-1': 'LOW',
  0: 'MEDIUM',
  1: 'HIGH'
};
const PRIORITIES_OLD = Object.values(priorityOld);
const DEFAULT_OLD = priorityOld[0];
const PRIORITIES_NEW = Object.values(priorityNew);
const DEFAULT_NEW = priorityNew.MEDIUM;

export class Migration20230130105713 extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();
    this.addNewColumn(knex, PRIORITIES_NEW, DEFAULT_NEW);
    const tasks = await this.getTasks(knex);
    this.updatePriorityField(knex, tasks, priorityNew);
    this.dropOldColumn(knex, COLUMN_NAME);
    this.renameNewColumn(knex, TEMP_COLUMN_NAME, COLUMN_NAME);
  }

  async down(): Promise<void> {
    const knex = this.getKnex();
    this.addNewColumn(knex, PRIORITIES_OLD, DEFAULT_OLD);
    const tasks = await this.getTasks(knex);
    this.updatePriorityField(knex, tasks, priorityOld);
    this.dropOldColumn(knex, COLUMN_NAME);
    this.renameNewColumn(knex, TEMP_COLUMN_NAME, COLUMN_NAME);
  }

  getTasks(knex: Knex) {
    return this.execute(knex.select('id', COLUMN_NAME).from(TABLE_NAME));
  }

  addNewColumn(knex: Knex, values: Array<string | number>, defaultValue: string | number) {
    this.addSql(
      knex.schema.alterTable(TABLE_NAME, table => {
        table.enu(
          TEMP_COLUMN_NAME,
          values
        ).defaultTo(defaultValue);
      }).toQuery()
    );
  }

  updatePriorityField(knex: Knex, tasks: Partial<Task>[], priority: PriorityNew | PriorityOld) {
    tasks.forEach(task => {
      const priorityValue = priority[task[COLUMN_NAME] as unknown as keyof typeof priority];
      this.addSql(
        knex(TABLE_NAME)
          .where('id', task.id)
          .update({ [TEMP_COLUMN_NAME]: priorityValue })
      );
    });
  }

  renameNewColumn(knex: Knex, oldName: string, newName: string) {
    this.addSql(
      knex.schema.alterTable(TABLE_NAME, table => {
        table.renameColumn(oldName, newName);
      }).toQuery()
    );
  }

  dropOldColumn(knex: Knex, columName: string) {
    this.addSql(
      knex.schema.alterTable(TABLE_NAME, table => {
        table.dropColumn(columName);
      }).toQuery()
    );
  }
}
