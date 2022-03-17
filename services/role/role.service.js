const mongoose = require('mongoose');
const roleModel = require('../../models/roleModel/role.model');


async function create(roleDetails) {
    try {
        var role = new roleModel(roleDetails);
        var result = await role.save().then((res) => {
            return { isSuccess: true, message: "Role created Successfully", data: res }
        }).catch((err) => {
            return { isSuccess: false, message: "Failed to create Role", data: err }
        });
        return result;
    }
    catch (ex) {
        return { isSuccess: false, data: ex, message: "Something Went Wrong!!" };
    }
}

async function get() {
    try {
        var result = await roleModel.find().exec().then((res) => {
            return { isSuccess: true, message: "Roles Retrieved Successfully", data: res }
        }).catch((err) => {
            return { isSuccess: false, message: "Failed to get Roles", data: err }
        });
        return result;
    }
    catch (ex) {
        return { isSuccess: false, data: ex, message: "Something Went Wrong!!" };
    }
}

async function getById(id) {
    try {
        var result = await roleModel.findById(id).exec().then((res) => {
            return { isSuccess: true, message: "Role Retrieved Successfully", data: res }
        }).catch((err) => {
            return { isSuccess: false, message: "Failed to get Role", data: err }
        });
        return result;
    }
    catch (ex) {
        return { isSuccess: false, data: ex, message: "Something Went Wrong!!" };
    }
}

async function deleteByRoleId(id) {
    try {
        var result = await roleModel.updateOne({ _id: id }, { isActive: false, isDeleted: true }).then((res) => {
            return { isSuccess: true, message: "Role Deleted Successfully", data: res }
        }).catch((err) => {
            return { isSuccess: false, message: "Failed to Deleted Role", data: err }
        });
        return result;
    }
    catch (ex) {
        return { isSuccess: false, data: ex, message: "Something Went Wrong!!" };
    }
}
async function update(id, req) {
    try {
        //var role = new roleModel(req);
        var result = await roleModel.findByIdAndUpdate(id, req, { new: true }).then((res) => {
            return { isSuccess: true, message: "Role Updated Successfully", data: res }
        }).catch((err) => {
            return { isSuccess: false, message: "Failed to Updated Role", data: err }
        });
        return result;
    }
    catch (ex) {
        return { isSuccess: false, data: ex, message: "Something Went Wrong!!" };
    }
}

module.exports = {
    createRole: create,
    getRoles: get,
    getByIdInfo: getById,
    deleteRole: deleteByRoleId,
    updateRole: update
}