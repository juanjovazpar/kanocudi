import swaggerJsdoc from "swagger-jsdoc";
import { version, name } from "../../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: `${name} API Documentation`,
      version,
      description: `API documentation for ${name}`,
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./build/api/routes/*.js", "./build/api/schemas/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

// TODO: Generate React services: openapi-generator-cli generate -i ./build/swagger.json -g typescript -o ./src/services
