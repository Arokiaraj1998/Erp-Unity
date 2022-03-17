const mongoose = require('mongoose');
const dateHelper = require('../lib/date');

const baseSchemaFactory = (schemaDefinition) => {
    return new mongoose.Schema({   
        _id: mongoose.Schema.Types.ObjectId,   
        createdDate: {type: Date, default: dateHelper.utc},
        updatedDate: {type: Date, default: dateHelper.utc},
        startDate:{type: Date, default: dateHelper.utc},
        endDate:{type: Date, default: dateHelper.utc},
        createdBy: { type: mongoose.Schema.Types.ObjectId },
        updatedBy: { type: mongoose.Schema.Types.ObjectId },
        isActive:{ type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
        ...schemaDefinition 
    });
  }

  module.exports = baseSchemaFactory;