const db = require("../models");
const Queue = db.queueing;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Create queue number
exports.create = (req, res) => {
  // Validate request
  if (!req.body.queueNumber) {
    res.status(400).send({ message: "Fill in all the required details" });
    return;
  }

  // Create queue details
  const queue = new Queue({
    queueNumber: req.body.queueNumber,
    name: req.body.name,
    idNo: req.body.idNo,
    year: req.body.year,
    course: req.body.course,
    college: req.body.college,
    mobileNo: req.body.mobileNo,
    email: req.body.email,
    service: req.body.service,
    queuedAt: req.body.queuedAt,
    served: req.body.served ? req.body.served : false
  });

  // Save queue slot/customer in the database
  queue
    .save(queue)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "There is an error occurred while creating the queue number."
      });
    });
};

// Retrieve all queue numbers from the database.
exports.findAll = (req, res) => {
  const { page, size, queueNumber } = req.query;
  var condition = queueNumber ? { queueNumber: { $regex: new RegExp(queueNumber), $options: "i" } } : {};
  const { limit, offset } = getPagination(page, size);

  Queue.paginate(condition, { offset, limit })
  .then((data) => {
    res.send({
      totalItems: data.totalDocs,
      queueing: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
    });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "There is an error occurred while retrieving queue numbers."
      });
    });
};

// Find a customer
exports.findOne = (req, res) => {
  const id = req.params.id;

  Queue.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found this customer" + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "There is an error retrieving this customer" });
    });
};

// Update a customer
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Queue.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update this customer. Maybe queue number was not found!`
        });
      } else res.send({ message: "Customer was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating this customer with"
      });
    });
};

// Delete a queue number
exports.delete = (req, res) => {
  const id = req.params.id;

  Queue.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete this queue number. Maybe queue number was not found!`
        });
      } else {
        res.send({
          message: "Queue number was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete queue number"
      });
    });
};

// Reset queue.
exports.deleteAll = (req, res) => {
  Queue.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Items were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "There is an error occurred while reseting queue."
      });
    });
};

// Find all served customers
exports.findAllServed = (req, res) => {
  Queue.find({ served: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving served customers."
      });
    });
};

