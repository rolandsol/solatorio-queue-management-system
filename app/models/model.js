module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      queueNumber: String,
      name: String,
      idNo: String,
      year: String,
      course: String,
      college: String,
      mobileNo: String,
      email: String,
      service: String,
      queuedAt: String,
      served: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);

  const Queue = mongoose.model("queue", schema);
  return Queue;
};
