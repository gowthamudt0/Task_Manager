const db = require("../config/db");
const dotenv = require("dotenv").config();
const uuid = require("../utilies/uuid");
const dates = require("../utilies/date");

// create a task

exports.taskcreate = async (req, res) => {
  try {
    const taskid = uuid();
    const { titlel, description, deadline, updatedat, createdby, updateby } =
      req.body;
    const createat = dates();
    const exTask = await db.query(
      `SELECT * FROM task WHERE titlel='${titlel}' AND status='active'`
    );

    if (exTask.length > 0) {
      res.status(409).send("Task already exists and is active");
      return;
    }

    const taskQuery = `
            INSERT INTO task(taskid, titlel, description, deadline, status, createat, updatedat, createdby, updateby)
            VALUES ('${taskid}', '${titlel}', '${description}', '${deadline}', 'not assigned', '${createat}', '${updatedat}', '${createdby}', '${updateby}')
        `;

    db.query(taskQuery, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal server error");
      } else {
        res.status(200).send("Task created successfully");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// GetallTask

exports.getAllTasks = async (req, res) => {
  try {
    db.query(
      'SELECT taskid ,titlel, description FROM task WHERE status="not assigned"',
      (err, result) => {
        if (err) console.log(err);
        res.send(result);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};


