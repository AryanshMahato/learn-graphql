export class DatabaseConfigProvider {
  // Returns Configuration for TypeORM database Connection
  public static getConnectionConfig = () => ({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: ['entity/*.ts'],
    migrations: ['migration/*.ts'],
    cli: {
      migrationsDir: 'migration',
    },
  });
}