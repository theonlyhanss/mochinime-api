import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mochinime API',
      version: '1.0.0',
      description: 'Dokumentasi REST API Mochinime untuk streaming anime subtitle Indonesia.\n\n[Website](https://hanmetaforce.my.id)\n\n[Donate here](https://saweria.co/hanmetaforce)'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      },
      {
        url: 'https://mochinime-api.vercel.app',
        description: 'Production server'
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
