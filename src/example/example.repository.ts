import { inject, injectable } from 'inversify';
import { DatabaseClient } from '~/core/database';
import { Repository } from '~/core/repository';
import { Types } from '~/core/types';

import { Example, ExampleDocument } from './example.entity';

@injectable()
export class ExampleRepository extends Repository<Example, ExampleDocument> {
  constructor(
    @inject(Types.DatabaseClient) databaseClient: DatabaseClient
  ) {
    super(
      databaseClient,
      'Example',
      {
        name: String,
      }
    );
  }
}
