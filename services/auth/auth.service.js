const Bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('../../lib/generateJWTToken');
const User = require('../../models/userModel/user.model');

// async function Create(user,req) {
//     try { 
//          var userValue = User(user)
//          userValue._id = new mongoose.Types.ObjectId;
//          userModel.fullName = user.firstName + ' ' + user.lastName;
//         var result = await userValue.save()
//             .then(doc => {
//                 if (result != "") {
//                     return { isSuccess: true, message: "User Created SuccessFully!", data: doc };
//                 }
//                 else (err) => {
//                     return { isSuccess: false, message: "Can't Create!!", data: err }
//                 }
//             })
//             .catch(err => {
//                 return { isSuccess: false, message: "User Couldn't Create!", data: err }
//             });
//         return result;
//     }
//     catch (error) {
//         return { isSuccess: false, message: "Failed!", data: error };
//     }
// };
async function ValidateUser(email, password) {
    try {
        const user = await User.findOne({ email: email })
        if (user == null) {
            return { isSuccess: false, data: {}, message: "Can't Find the User!!" };
        }
        if (!user.isActive) {
            return { isSuccess: false, data: {}, message: "User is Temporary InActive, Please contact Adminstrator!!" };
        }

        if(user) {
            let pwdHash = (password, user.password);
            if (pwdHash) {
                let token = jwt.generateUserToken(user.email, user._id)
                return {
                    isSuccess: true,
                    data: {
                        id:user._id,
                        token: token,
                        //tenantId: user.tenantId,
                        userName: user.fullName,
                    }
                }
            }
            return {isSuccess:false,message:"Invalid Password",data:{}};
        }
        return { isSuccess: false, message:"Can't Valid Email", data: {}};
    }
    catch (ex) {
        return { isSuccess: false, message:"Invalid Email", data: {} };
    }
};

module.exports = {
    validateUser:ValidateUser
}