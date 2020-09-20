import dotenv from 'dotenv';
import { join } from 'path';

export const load = (relativePath: string): void => {
  const path = join(process.cwd(), relativePath || '.env');
  dotenv.config({ path });
};
