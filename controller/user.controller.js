const express = require('express');
const mongoose = require('mongoose');
const Bcrypt = require('bcryptjs');
const responseHelper = require('../lib/responseHelper');
const userService =require('../services/user/user.service');
const router = express.Router();

router.post('/createUser',async (req,res) => {
    try{
        var userData = req.body;
        var userData = Bcrypt.hashSync(req.body.password);
        var result = await userService.createUser(userData);
        if (result.isSuccess) {
            return res.status(200).json(result);
        }
        else {
            return res.status(400).json(result);
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
})
module.exports = router;