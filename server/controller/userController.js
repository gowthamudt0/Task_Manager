const db = require("../config/db");
const dotenv = require("dotenv").config();
const uuid = require("../utilies/uuid");
const dates = require("../utilies/date");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.insert = async (req, res, token) => {
  try {
    const userid = uuid();
    const { useremail, username,userpassword } = req.body;
    let createby = userid;
    const createat = dates();

    const exUser = db.query(
      `SELECT * FROM task_manager.user WHERE useremail='${useremail}'`
    );

    if (exUser == 0) {
      res.status(409).send("User already exists");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userpassword, saltRounds);
    const insertionQuery = `INSERT INTO user(userid, username, useremail, userrole, userpassword, createat, createby, updateat, updateby) VALUES ('${userid}', '${username}', '${useremail}', 'user', '${hashedPassword}', '${createat}', '${createby}', '-', '-')`;

    db.query(insertionQuery);
    res.status(200).send("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// login

exports.login = async (req, res) => {
  const { useremail, userpassword } = req.body;

  const read = `SELECT * FROM user WHERE useremail ='${useremail}'`;
  db.query(read, (err, results) => {
    if (!results) {
      return res.status(404).send("User Not Found");
    }
    const user = results[0];

    bcrypt.compare(userpassword, user.userpassword, (err, result) => {
      if (result) {
        const token = jwt.sign(
          {
            userid: user.userid,
            userrole: user.userrole,
            useremail: user.useremail,
          },
          process.env.SECRET
        );
        return res
          .status(200)
          .send({ msg: "Login Successfully", token: token });
      } else {
        return res.status(403).send("Incorrect Password");
      }
    });
  });
};

// update

exports.update = (req, res) => {
  console.log(req.user)
  const updateat = dates();
  const { useremail, username, userpassword } = req.body;
  const updateby = username;

  const updateQuery = `UPDATE user SET username='${username}', userpassword='${userpassword}', updateat='${updateat}', updateby='${updateby}' WHERE useremail='${useremail}'`;

  db.query(updateQuery, (err, result) => {
    if (err) {
      res.status(409).send("Error in update");
    } else {
      res.status(200).send("User created successfully");
    }
  });
};

// Get user Detail
exports.getAllUser = async (req, res) => {
  try {
    db.query(
      'SELECT userid,username, useremail FROM user WHERE userrole="user"',
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
