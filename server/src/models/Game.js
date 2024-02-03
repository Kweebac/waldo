const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Game",
  mongoose.Schema({
    name: { type: String, required: true },
    characters: [
      {
        name: { type: String, required: true },
        position: {
          x: [{ type: Number, required: true }],
          y: [{ type: Number, required: true }],
        },
      },
    ],
    times: [
      {
        username: { type: String, required: true },
        time: { type: Number, required: true },
      },
    ],
  })
);
