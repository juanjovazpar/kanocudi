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
// import fs from "fs";
// const swaggerJson = JSON.stringify(swaggerSpec, null, 2);
// fs.writeFileSync("./build/swagger.json", swaggerJson, "utf-8");
// openapi-generator-cli generate -i ./build/swagger.json -g typescript -o ./src/services

export default swaggerSpec;
