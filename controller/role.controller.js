const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const roleService = require('../services/role/role.service');
const router = express.Router();


router.post('/createRole', async (req, res) => {
    try {
        const roleDetails = req.body;
        var result = await roleService.createRole(roleDetails);
        if (result.isSuccess) {
            return res.status(200).json(result);
        }
        else {
            return res.status(400).json(result);
        }
    }
    catch {
        return res.status(500).json(error);
    }
});

router.get('/getRoles', async (req, res) => {
    try {
        var result = await roleService.getRoles();
        if (result.isSuccess) {
            return res.status(200).json(result);
        }
        else {
            return res.status(400).json(result);
        }
    }
    catch {
        return res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        var result = await roleService.getByIdInfo();
        if (result.isSuccess) {
            return res.status(200).json(result);
        }
        else {
            return res.status(400).json(result);
        }
    }
    catch {
        return res.status(500).json(error);
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        var result = await roleService.deleteRole(id);
        if (result.isSuccess) {
            return res.status(200).json(result);
        }
        else {
            return res.status(400).json(result);
        }
    }
    catch {
        return res.status(500).json(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const projectid = req.params.id;
        const roleDetails = req.body;
        var result = await roleService.updateRole(projectid, roleDetails);
        if (result.isSuccess) {
            return res.status(200).json(result);
        }
        else {
            return res.status(400).json(result);
        }
    }
    catch {
        return res.status(500).json(error);
    }
})

module.exports = router;
