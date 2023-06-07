const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const proposalsSchema = new Schema({
  subject: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  notes: {
    type: [String],
    required: true
  },
  createdBy: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      ref: "User",
      
    },
    email: {
      type: String,
      ref: "User",
     
    },
    contact: {
      type: String,
      ref: "User",
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Proposals", proposalsSchema);
