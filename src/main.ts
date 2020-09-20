import { load } from '~core/environment';
import { bootstrap } from './application';

load(`.env.${process.env.NODE_ENV}`);
const app = bootstrap();

app.listen(
  process.env.PORT || 3000,
  () => console.log('[ Ready ]')
);
