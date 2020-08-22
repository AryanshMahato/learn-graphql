import { createConnection, Connection } from 'typeorm';
import { DatabaseConfigProvider } from '../Providers/DatabaseConfigProvider';

export class DatabaseService {
  // Creates Database Connection
  public static createDbConnection = async (): Promise<Connection> => {
    return await createConnection(DatabaseConfigProvider.getConnectionConfig());
  };
}
