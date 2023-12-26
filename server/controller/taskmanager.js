const db = require("../config/db");
const dotenv = require("dotenv").config();
const uuid = require("../utilies/uuid");
const dates = require("../utilies/date");
const update = require("../controller/taskcontroller");
const nodemailer = require("../utilies/mailer");
var cron = require("node-cron");

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// create task

exports.assignedtask = async (req, res) => {
  const taskmanagementid = uuid();
  const { taskid, userid, createby, updateby, updateat } = req.body;
  const createat = dates();

  try {
    const taskmanagement = `INSERT INTO taskmanagement(taskmanagementid, taskid, userid, status, createby, createat, updateby, updateat) VALUES ('${taskmanagementid}', '${taskid}', '${userid}', 'assigned','${createby}','${createat}', '${updateby}', '${updateat}')`;

    db.query(taskmanagement, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal server error");
      } else {
       
        res.status(200).send("Taskmanagement created successfully")
        this.mail()
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

exports.assigneduser = async (req, res) => {
  try {
    var sql = `SELECT taskmanagement.taskmanagementid, taskmanagement.status,task.titlel,task.description,task.deadline FROM taskmanagement LEFT JOIN task ON taskmanagement.taskid=task.taskid WHERE userid='${req.params.userid}' `;
    db.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  } catch {
    res.status(500).send("Internal server error");
  }
};

// update a user
exports.updateuser = async (req, res) => {
  db.query(
    `UPDATE taskmanagement SET status="${req.body.status}" WHERE taskmanagementid="${req.params.taskmanagementid}"`,
    (err, result) => {
      if (err) console.log(err);
      res.status(200).send("update sucessfully");
    }
  );
};

// send mail

// exports.mail=async(req,res)=>{

// cron.schedule(' * * * * * ', () => {
//   console.log("dfgh")
//   var sql = `SELECT task.titlel,task.description,task.deadline,user.username FROM ((taskmanagement LEFT JOIN task ON taskmanagement.taskid=task.taskid) LEFT JOIN user ON taskmanagement.userid=user.userid) `;
//   db.query(sql, function (err, result){
//     if (err) throw err;
//    const message=
//   ` <table style="width:100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #ddd;">
//    <tr style="background-color: #f2f2f2;">
//      <th style="padding: 8px; border: 1px solid #ddd;">Title</th>
//      <th style="padding: 8px; border: 1px solid #ddd;">Description</th>
//      <th style="padding: 8px; border: 1px solid #ddd;">Deadline</th>
//    </tr>
//    ${result.map((data) => {
//      return (
//        `<tr style="border: 1px solid #ddd;">
//          <td style="padding: 8px; border: 1px solid #ddd;">${data.titlel}</td>
//          <td style="padding: 8px; border: 1px solid #ddd;">${data.description}</td>
//          <td style="padding: 8px; border: 1px solid #ddd;">${data.deadline}</td>
//        </tr>`
//      )
//    }).join("")}
// </tabel>`
// nodemailer.nodemailer(message)
// });
// });
// }

exports.mail = async (req, res) => {
  cron.schedule(" */10  *  * * *  ", () => {
    const csvWriter = createCsvWriter({
      path: "E:\\taskmanager\\server\\public\\excel.csv",
      header: [
        { id: "title", title: "Title" },
        { id: "description", title: "description" },
        { id: "deadline", title: "deadline" },
      ],
    });

    var sql = `SELECT task.titlel,task.description,task.deadline,user.username FROM ((taskmanagement LEFT JOIN task ON taskmanagement.taskid=task.taskid) LEFT JOIN user ON taskmanagement.userid=user.userid) `;
    db.query(sql, async (err, result) => {
      if (err) throw err;

      const message = result.map((data) => ({
        title: data.titlel,
        description: data.description,
        deadline: data.deadline,
      }));

      var excel = csvWriter.writeRecords(message);
      nodemailer.nodemailer(excel);
    });
  });
};




exports.getTask=async (req, res) => {
  try {
    var sql = `SELECT task.titlel,task.description,task.deadline,user.username,taskmanagement.status FROM ((taskmanagement LEFT JOIN task ON taskmanagement.taskid=task.taskid)
     LEFT JOIN user ON taskmanagement.userid=user.userid ) `;
    db.query(sql,(err, result) => {
        if (err) console.log(err);
        res.send(result);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};