const mongoose = require('mongoose');
const baseSchema = require('../base.model');



const roleSchema = baseSchema({
    tenantId: { type: String, required: true },
    reportingTo: { type: Boolean, required: true },
    name: { type: String, required: true },
},{collection:'Role'});

module.exports = mongoose.model('Role', roleSchema);
