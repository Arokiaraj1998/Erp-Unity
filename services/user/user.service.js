const mongoose = require('mongoose');
const User = require('../../models/userModel/user.model')
const moment = require('moment');

async function Create(user){
    try {
           var userModel = User(user);
           //userModel.pwdHash = pwdHash;
           userModel._id = new mongoose.Types.ObjectId;
           //userModel.tenantId = tenantId;
           userModel.fullName = user.firstName + ' ' + user.lastName;
           //userModel.createdDate = moment.utc();
            var result = await userModel.save()
            .then((res) => {
                return { isSuccess: true, message: "User Created successfully!!", data: res };
            }).catch((err) => {
                return { isSuccess: false, message: "Failed to create User!!", data: err };
            });
        return result;
    }
    catch (ex) {
        return { isSuccess: false, data: ex, message: "Something Went Wrong!!" };
    }
}


module.exports = {
    createUser: Create
}