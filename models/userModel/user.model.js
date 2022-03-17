const mongoose = require('mongoose');
const baseSchemaFactory = require('../base.model');

const baseOptions = {
    discriminatorKey: 'kind',
    collection: "users"
}

let userSchema = baseSchemaFactory({
    firstName: { type: String},
    lastName: { type: String},
    fullName: { type: String, required: true },
    email:{
        type:String,
        required:true,
        unique:true,
        //lowercase:true
    },
    password:{ type: String, required: true},
    //role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }

},baseOptions);

userSchema.methods.setFullName = function(firstName,lastName){
    this.fullName = this.firstName+ ' ' + this.lastName;

};

module.exports = mongoose.model('User',userSchema);