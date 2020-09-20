import 'reflect-metadata';
import { load as loadEnvironment } from '~/core/environment';
import { bootstrap } from './application';
import { getDependencyContainer } from '~/core/dependency-injection';
import { connectToDatabase, DatabaseClient } from '~/core/database';
import { Types } from '~/core/types';

loadEnvironment('.env');

connectToDatabase(process.env.DATABASE_URL || '')
.then((client) => {
  const container = getDependencyContainer();
  container
  .bind<DatabaseClient>(Types.DatabaseClient)
  .toConstantValue(client)

  const app = bootstrap(container);
  app.listen(
    process.env.PORT || 3000, () => {
      console.log('[ Ready ]')
    }
  );
})
.catch((error: Error) => {
  console.log('[ Could not start application ] ', error.name);
});
