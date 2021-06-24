module.exports = app => {
  const queueing = require("../controllers/controller.js");

  var router = require("express").Router();

  // Create a new queue number.
  router.post("/", queueing.create);

  // Display all queue numbers.
  router.get("/", queueing.findAll);

  // Display all served customer
  router.get("/served", queueing.findAllServed);

  // Find a customer
  router.get("/:id", queueing.findOne);

  // Update customer
  router.put("/:id", queueing.update);

  // Remove customer
  router.delete("/:id", queueing.delete);

  // Reset queue
  router.delete("/", queueing.deleteAll);


  app.use("/api/queueing", router);
};
