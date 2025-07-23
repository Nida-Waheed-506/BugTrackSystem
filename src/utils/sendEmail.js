const nodemailer = require("nodemailer");

const sendEmail = (user,assignment , type) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: "nida.waheed@visnext.net",
      pass: "xjhu hytd vsrh bdtq",
    },
  });

  const mailOptions = {
    from: "nida.waheed@visnext.net",
    to: "nidawaheed506@gmail.com",
    subject: type === "project" ? `${user.name} - Your Project Assignment`:  `${user.name} - Your Bug Assignment`,
    text: type === "project" ? `Hi ${user.name}, You are assigned to a project:  ${assignment.projectName}`: `Hi ${user.name}, You are assigned to a bug : ${assignment.title}`,
  };

  
  transporter.sendMail(mailOptions, (error, info) => {
   
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = { sendEmail };
