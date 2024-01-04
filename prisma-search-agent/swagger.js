import swaggerJSDoc from 'swagger-jsdoc';

// Swagger definition
const swaggerDefinition = {
  info: {
    title: 'API',
    version: '1.0.0',
    description: 'API for prisagent',
  },
  host: '16.171.39.224:3000',
  basePath: '/',
};

// Options for the swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['./routers/*.js'], // replace with the path to your route files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;