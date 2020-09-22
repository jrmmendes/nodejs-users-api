import { Application } from 'express';
import { join } from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

export const configureSwagger = (url: string, app: Application) => {
  const swaggerDocument = YAML.load(join(process.cwd(), 'swagger.yaml'));
  app.use(
    url,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
  );
};
