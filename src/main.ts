import { createApplication } from './bootstrap';

const app = createApplication();
app.listen(process.env.PORT || 3000);
