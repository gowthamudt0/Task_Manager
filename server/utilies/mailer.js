var nodemailer = require("nodemailer");

exports.nodemailer = (excel) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gowthamudt0@gmil.com.com",
      pass: "baig fzzu luio fhis",
    },
  });

  var mailOptions = {
    from: "gowthamudt0@gmail.com'",
    to: "gowthamudt23@gmail.com",
    subject: "taskmanager",
    text: "Task status",
    attachments: [
      {
        filename: "file.csv",
        path: "E:\\taskmanager\\server\\public\\excel.csv",
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
