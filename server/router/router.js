const express = require("express");
const router = express.Router();
const insertController = require("../controller/userController");
const taskcontroller = require("../controller/taskcontroller");
const taskmanagement = require("../controller/taskmanager");
const valid=require('../middleware/auth')
// user controller
router.post("/insert", insertController.insert);
router.post("/login", insertController.login);
router.get("/getuser", insertController.getAllUser);
router.put("/update", valid.auth,insertController.update);

// task controller
router.post("/task", taskcontroller.taskcreate);
router.get("/getall", taskcontroller.getAllTasks);

// taskmanagement
router.post("/create", taskmanagement.assignedtask);
router.get("/get/:userid", taskmanagement.assigneduser);
router.put("/updateuser/:taskmanagementid", taskmanagement.updateuser);
router.get("/nodemalier", taskmanagement.mail);
router.get("/getalltask",taskmanagement.getTask)

module.exports = router;
