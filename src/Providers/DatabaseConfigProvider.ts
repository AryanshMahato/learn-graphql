import { createConnection } from 'typeorm';
import path from 'path';

export class DatabaseConfigProvider {
  private static getEntityPath(): string {
    const entity = path.join(__dirname, '..', 'Entity');

    return `${entity}/*.[tj]s`;
  }

  private static getMigrationPath(): string {
    const entity = path.join(__dirname, '..', 'Migration');

    return `${entity}/*.[tj]s`;
  }

  // Returns Configuration for TypeORM database Connection
  public static getConnectionConfig = () => {
    return {
      type: 'postgres',
      host: process.env.TYPEORM_HOST!,
      port: +process.env.TYPEORM_PORT!,
      username: process.env.TYPEORM_USERNAME!,
      password: process.env.TYPEORM_PASSWORD!,
      database: process.env.TYPEORM_DATABASE!,
      entities: [DatabaseConfigProvider.getEntityPath()],
      migrations: [DatabaseConfigProvider.getMigrationPath()],
      schema: 'public',
      cli: {
        migrationsDir: 'Migration',
      },
    } as Parameters<typeof createConnection>[0];
  };
}
