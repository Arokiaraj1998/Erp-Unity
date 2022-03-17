const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
var swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

module.exports = function () {
  let server = express(),
    create,
    start;

  create = (config) => {
    let routes = require("../routes");

    server.set("env", config.env);
    server.set("port", config.port);
    server.set("hostname", config.hostname);
    mongoose.set("runValidators", true);

    server.use(bodyParser.json());
    server.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );
    server.use(cors());

    // Mongoose Connections
    mongoose
      .connect(config.dbSettings.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: config.dbSettings.databaseName,
      })
      .then((con) => {
        if (con) {
          console.log("Mongo db Connected!!!");
          mongoose.set("debug", true);
        } else {
          console.log("FAILED TO CONNECT MONGO DB!!");
        }
      })
      .catch((error) => {
        if (error) {
          console.log("FAILED TO CONNECT MONGO DB!!");
          console.log(error);
        }
      });

    // Swagger Implementation
    var swaggerDefinition = {
      info: {
        title: "Node Swagger API",
        version: "1.0.0",
        description: "Demonstrating how to describe a RESTful API with Swagger",
      },
      host: "localhost:3000",
      basePath: "/api/v1",
    };

    var swaggerDocument = swaggerJSDoc({
      // import swaggerDefinitions
      swaggerDefinition: swaggerDefinition,
      // path to the API docs
      apis: ["./controller/apis/.js"],
    });

    server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    server.get("/swagger.json", function (req, res) {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerDocument);
    });
    //   server.use(errorConverter);
    // Set up routes
    routes.init(server);
  };
  start = () => {
    let hostname = server.get("hostname"),
      port = server.get("port");
    server.listen(port, function () {
      console.log(`http://${hostname}:${port}`);
    });
  };

  return {
    create: create,
    start: start,
  };
};
