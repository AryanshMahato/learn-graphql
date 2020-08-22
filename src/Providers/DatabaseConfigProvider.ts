import { createConnection } from 'typeorm';

export class DatabaseConfigProvider {
  // Returns Configuration for TypeORM database Connection
  public static getConnectionConfig = () =>
    ({
      type: 'postgres',
      host: process.env.TYPEORM_HOST!,
      port: +process.env.TYPEORM_PORT!,
      username: process.env.TYPEORM_USERNAME!,
      password: process.env.TYPEORM_PASSWORD!,
      database: process.env.TYPEORM_DATABASE!,
      entities: ['Entity/*.ts'],
      migrations: ['Migration/*.ts'],
      cli: {
        migrationsDir: 'Migration',
      },
    } as Parameters<typeof createConnection>[0]);
}
