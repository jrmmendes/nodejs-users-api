import 'reflect-metadata';
import { connectToDatabase, DatabaseClient } from '~/core/database';
import { load as loadEnvironment } from '~/core/environment';
import container from '~/core/inversify.config';
import { Types } from '~/core/types';
import { bootstrap } from './application';

loadEnvironment('.env');

connectToDatabase(process.env.DATABASE_URL || '')
.then((client) => {
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
  console.log('[ Could not start application ] \n', { error });
});
