const express = require('express');
const router = express.Router();
const AuthService = require('../services/auth/auth.service');
const responseHelper = require('../lib/responseHelper')

router.post('/signin', async (req, res) => {
    try {
        const loginData = req.body;
        let response = await AuthService.validateUser(loginData.email, loginData.password);
        return responseHelper.SendResponse(res, response);
    }
    catch (err) {
        return responseHelper.SendErrorResponse(err, res);
    }
});

module.exports = router;