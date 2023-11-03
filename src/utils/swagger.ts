export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HireAModel API',
      version: '1.0.0',
      description: 'API for HireAModel',
      termsOfService: 'http://example.com/terms/',
      contact: {
        name: 'Technical Support',
        url: 'http://www.example.com/support',
        email: 'support@example.com',
      },
      license: {
        name: 'Licencia MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:4001',
        description: 'Local Environment',
      },
      {
        url: 'https://api-hireamodel-production.up.railway.app',
        description: 'Testing Environment',
      },
    ],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
    security: [
      {
        Bearer: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};
