const mongoose = require("mongoose");

const Meeting = mongoose.model(
  "meeting",
  new mongoose.Schema({
    date: {
      type: Date,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    from: {
      type: String,
      require: true
    },

    to: {
      type: String,
      require: true
    },
    mentor: {
      type: String,
      require: true
    },
    with: {
      type: String,
      require: true
    }
  })
);

module.exports = Meeting;
