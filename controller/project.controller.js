const express = require("express");
const router = express.Router();
const projectService = require("../services/project/project.service");

/**
 * @swagger
 * definitions:
 *   project:
 *     properties:
 *       projectName:
 *         type: string
 *       projectType:
 *         type: string
 *       status:
 *         type: string
 *       tenantId:
 *         type: string
 */
//reuse

/**
 * @swagger
 * /project:
 *   post:
 *     tags:
 *       - project
 *     description: Creates a new project
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: project
 *         description: project
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/project'
 *     responses:
 *       200:
 *         description: Successfully created
 *
 */

//Create PROJECT
router.post("/createProject", async (req, res) => {
  try {
    var projectDetails = req.body;
    var result = await projectService.createProject(projectDetails);
    if (result.isSuccess) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

/**
 * @swagger
 * /project:
 *   get:
 *     tags:
 *       - project
 *     description: Return All project
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All project
 */
//Get PROJECT
router.get("/", async (req, res) => {
  try {
    //let tenantId = req.query.tenantId;
    var result = await projectService.getProjectList(req);
    if (result.isSuccess) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

/**
 * @swagger
 * /project/{id}:
 *   get:
 *     tags:
 *       - project
 *     description: Return a single project
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Project id
 *         in: path
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/project'  
 *     responses:
 *       200:
 *         description: A single of project
 */

router.get("/:id", async (req, res) => {
  let Data = req.params.id;
  try {
    var result = await projectService.getProjectId(Data);
    if (result.isSuccess) {
      return res.status(200).json(result);
    } else {
      return res.statusMessage(400).json(result);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

/**
 * @swagger
 * /project/{id}:
 *   put:
 *     tags:
 *       - project
 *     description: Update project
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Project id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Update project
 */
//Update Project
router.put("/updateProject/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const projectDetails = req.body;

    var result = await projectService.updateProject(id, projectDetails);
    if (result.isSuccess) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.put("/updateProject/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const projectDetails = req.body;

    var result = await projectService.updateProject(id, projectDetails);
    if (result.isSuccess) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
