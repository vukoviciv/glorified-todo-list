import { Account, Task, User } from './../src/database/entities';
import { CustomMigrationGenerator } from './../src/database/utils/migrationGenerator';
import { envs } from './envs';
import { getMigrationFileName } from '../src/database/utils/migrationFileName';
import { Options } from '@mikro-orm/core';

const options: Options = {
  entities: [Account, Task, User], // TODO: cleanup
  type: 'postgresql',
  dbName: 'my-todo-list',
  debug: true,
  clientUrl: envs.clientUrl,
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: './dist/migrations', // path to the folder with migrations
    pathTs: 'server/src/database/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: false, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: false, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: CustomMigrationGenerator, // migration generator, e.g. to allow custom formatting,
    fileName: getMigrationFileName
  },
  seeder: {
    path: './dist/seeders', // path to the folder with seeders
    pathTs: 'server/src/database/seeders', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className // seeder file naming convention
  }
};

export default options;
