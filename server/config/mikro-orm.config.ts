import { CustomMigrationGenerator } from './../src/database/utils/migrationGenerator';
import { defineConfig } from '@mikro-orm/core';
import { entities } from './../src/database/entities';
import { envs } from './index';
import { getMigrationFileName } from '../src/database/utils/migrationFileName';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const { name, debug, uri } = envs.database;

export default defineConfig({
  entities,
  dbName: name,
  clientUrl: uri,
  driver: PostgreSqlDriver,
  debug,
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
});
