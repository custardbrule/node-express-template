import { Express } from 'express';
// import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

function applySwaggerDoc(app: Express) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
        description:
          'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
        license: {
          name: 'Licensed Under MIT',
          url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
          name: 'JSONPlaceholder',
          url: 'https://jsonplaceholder.typicode.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
    },
    apis: ['./src/controllers/*.ts'],
  };

  const specs = swaggerJsdoc(options);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

export default applySwaggerDoc;
