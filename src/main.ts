import { load } from '~core/environment';
import { bootstrap } from './application';

load('.env');
const app = bootstrap();

app.listen(
  process.env.PORT || 3000,
  () => {
    console.log('[ Ready ] S:', process.env.APP_SECRET)
  }
);
