import { TSMigrationGenerator } from '@mikro-orm/migrations';

export class CustomMigrationGenerator extends TSMigrationGenerator {
  generateMigrationFile(className: string): string {
    /* eslint-disable quotes */
    let ret = `import { Migration } from '@mikro-orm/migrations';\n\n`;
    ret += `export class ${className} extends Migration {\n`;
    ret += `  async up(): Promise<void> {\n\n`;
    ret += `  }\n\n`;
    ret += `  async down(): Promise<void> {\n\n`;
    ret += `  }\n`;
    ret += `}\n`;

    return ret;
  }
}
