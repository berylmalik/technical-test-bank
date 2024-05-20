const swaggerUI = require("swagger-ui-express");
const swaggerJSON = require("./swagger.json"); //ini belom ada
const router = require("express").Router();

router.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));

module.exports = router;
