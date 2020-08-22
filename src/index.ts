import { EnvConfigProvider } from './Providers/EnvConfigProvider';

require('dotenv').config();
// TypeORM Dependency
import 'reflect-metadata';

import { DatabaseService } from './Services/DatabaseService';
import app from './app';

// Main function to use top level async/await
const main = async () => {
  try {
    await DatabaseService.createDbConnection();
    console.log('Database Connected!');
  } catch (e) {
    // Cannot connect to database, Error in Configuration Probably
    console.log('==========DB Connection Failed===========');
    console.log(e);
    console.log('==========DB Connection Failed===========');
  } finally {
    //? Starting server
    const port = EnvConfigProvider.getPort();
    app.listen(port, () => {
      console.log(`Server Started at PORT: ${port}`);
    });
  }
};

main().catch((e) => {
  // UnExpected Server Crash, Some Error is not handled Properly
  console.log('==========Server Crashed===========');
  console.log(e);
  console.log('==========Server Crashed===========');
});
