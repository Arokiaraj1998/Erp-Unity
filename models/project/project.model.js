const mongoose = require("mongoose");
const baseSchemaFactory = require("../base.model");
const resourceSchema = require("../resourceModel/resource.model");

const projectSchema = baseSchemaFactory(
  {
    clientName:{type: String},
    title: { type: String,required:true },
    teamSize: { type: Number },
    teamMembers: { type: [resourceSchema]},
  },
)

module.exports = mongoose.model('project',projectSchema,'project');
