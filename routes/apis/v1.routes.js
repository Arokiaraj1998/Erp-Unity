const express = require('express');
const router = express.Router();

// const projectRoute = require('../apis/projectRoute');

// router.use('/project', projectRoute);

const projectController = require('../../controller/project.controller');
const roleController = require('../../controller/role.controller');
const userController = require('../../controller/user.controller');

const tokenMiddleware = require('../../middlewares/verifyJWTToken');

const middlewares = [tokenMiddleware.verifyToken];

router.use('/project',projectController);
router.use('/role',roleController);
router.use('/user',userController);


module.exports = router;