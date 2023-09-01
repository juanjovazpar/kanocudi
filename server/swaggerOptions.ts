import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    info: {
      title: "Kanocudi API Documentation",
      version: "0.1.0",
      description: "API documentation for Kanocudi",
    },
    basePath: "/",
  },
  apis: ["./build/server/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
