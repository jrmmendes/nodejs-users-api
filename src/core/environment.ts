import dotenv from 'dotenv';
import { join } from 'path';

export const load = (relativePath: string) => {
  const path = join(process.cwd(), relativePath || '.env');
  dotenv.config({ path });
};
