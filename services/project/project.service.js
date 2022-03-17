const mongoose = require("mongoose");
const ProjectModel = require("../../models/project/project.model");
const moment = require("moment");
const projectModel = require("../../models/project/project.model");
const { db } = require("../../models/project/project.model");

async function Create(projectDetails) {
  try {
    var project = new ProjectModel(projectDetails);
    project._id = new mongoose.Types.ObjectId();
    var result = await project
      .save()
      .then((res) => {
        return {
          isSuccess: true,
          message: "Project Created successfully!!",
          data: res,
        };
      })
      .catch((err) => {
        return {
          isSuccess: false,
          message: "Failed to create Project!!",
          data: err,
        };
      });
    return result;
  } catch (ex) {
    return { isSuccess: false, data: ex, message: "Something Went Wrong!!" };
  }
}
async function GetAll(req) {
  try {
    let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;

    let pageNumber = req.query.pageNumber > 1 ? req.query.pageNumber : 1;

    let skip = pageSize * pageNumber - pageSize;

    let sorting = {};

    let filter = {};

    filter.isActive = true;
    filter.isDeleted = false;

    if (req.query.status)
      filter["teamMembers"] = { $elemMatch: { status: req.query.status } };

    if (req.query.sortBy && req.query.orderBy) {
      let sortByList = req.query.sortBy.split(",");
      let orderByList = req.query.orderBy.split(",");

      for (let i = 0; i < sortByList.length; i++) {
        let sortField = sortByList[i];
        sorting[sortField] = orderByList[i] === "desc" ? -1 : 1;
      }
    }

    var count = await projectModel
      .where(filter)
      .count()
      .then((res) => {
        return { isSuccess: true, data: res };
      });

    console.log(count);

    if (!req.query.status) {
      var result = await projectModel
        .find()
        .where(filter)
        .limit(pageSize)
        .skip(skip)
        .sort(sorting)
        .then((res) => {
          return {
            isSuccess: true,
            message: "Project List!!!",
            data: res,
            currentPage: pageNumber,
            pageSize: pageSize,
            totalRecords: count.data,
          };
        });
      return result;
    } else if (req.query.status) {
      var result = await projectModel
        .find(filter, { "teamMembers.$": 1 })
        .limit(pageSize)
        .skip(skip) //skip before all the data
        .sort(sorting)
        .then((res) => {
          return {
            isSuccess: true,
            message: "Project List!!!",
            data: res,
            currentPage: pageNumber,
            pageSize: pageSize,
            totalRecords: count.data,
          };
        });
      return result;
    }
  } catch (ex) {
    return {
      isSuccess: false,
      data: ex.message,
      message: "Something Went Wrong!!",
    };
  }
}

async function getById(id) {
  try {
    var result = await projectModel.findById(id).then((doc) => {
      return {
        isSuccess: true,
        message: "Project Retrieved Successfully",
        data: doc,
      };
    });

    return result;
  } catch (err) {
    return {
      isSuccess: false,
      data: ex,
      message: "Failed to Retreived Project!!",
    };
  }
};

async function Update(id, projectDetails) {
  try {
    var project = new ProjectModel(projectDetails);
    
    var result = await ProjectModel.findByIdAndUpdate(id, project, {
      new: true,
    }).then((doc) => {
      return {
        isSuccess: true,
        message: "Project Updated Successfully",
        data: doc,
      };
    });
    return result;
  } catch (ex) {
    return {
      isSuccess: false,
      data: ex,
      message: "Failed to Updated Project!!",
    };
  }
}
module.exports = {
  createProject: Create,
  getProjectList: GetAll,
  updateProject: Update,
  getProjectId :getById
};
