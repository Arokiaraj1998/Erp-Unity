const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: { type: String,required:true},
  gender: { type: String,},
  status: { type: String,required:true},
  resourceType: { type: String },
});
module.exports = resourceSchema;
