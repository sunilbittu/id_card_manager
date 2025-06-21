import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ID Card Management API',
      version: '1.0.0',
      description:
        'A fully-typed, production-ready REST API for an ID-Card Management system.',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/api/**/*.route.ts', './src/api/**/*.docs.yaml'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec; 