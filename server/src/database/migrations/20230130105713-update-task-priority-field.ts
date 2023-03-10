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
  knex = this.getKnex();

  async up(): Promise<void> {
    this.addNewColumn(PRIORITIES_NEW, DEFAULT_NEW);
    const tasks = await this.getTasks();
    this.updatePriorityField(tasks, priorityNew);
    this.dropOldColumn(COLUMN_NAME);
    this.renameNewColumn(TEMP_COLUMN_NAME, COLUMN_NAME);
  }

  async down(): Promise<void> {
    this.addNewColumn(PRIORITIES_OLD, DEFAULT_OLD);
    const tasks = await this.getTasks();
    this.updatePriorityField(tasks, priorityOld);
    this.dropOldColumn(COLUMN_NAME);
    this.renameNewColumn(TEMP_COLUMN_NAME, COLUMN_NAME);
  }

  getTasks() {
    return this.execute(
      this.knex.select('id', COLUMN_NAME).from(TABLE_NAME)
    );
  }

  addNewColumn(values: Array<string | number>, defaultValue: string | number) {
    this.addSql(
      this.knex.schema.alterTable(TABLE_NAME, table => {
        table.enu(
          TEMP_COLUMN_NAME,
          values
        ).defaultTo(defaultValue);
      }).toQuery()
    );
  }

  updatePriorityField(tasks: Partial<Task>[], priority: PriorityNew | PriorityOld) {
    tasks.forEach(task => {
      const priorityValue = priority[task[COLUMN_NAME] as unknown as keyof typeof priority];
      this.addSql(
        this.knex(TABLE_NAME)
          .where('id', task.id)
          .update({ [TEMP_COLUMN_NAME]: priorityValue })
      );
    });
  }

  renameNewColumn(oldName: string, newName: string) {
    this.addSql(
      this.knex.schema.alterTable(TABLE_NAME, table => {
        table.renameColumn(oldName, newName);
      }).toQuery()
    );
  }

  dropOldColumn(columName: string) {
    this.addSql(
      this.knex.schema.alterTable(TABLE_NAME, table => {
        table.dropColumn(columName);
      }).toQuery()
    );
  }
}
