const nodemailer = require('nodemailer');

const sendEmail = (user) => {

const transporter = nodemailer.createTransport({
    service:'gmail',
    secure:true,
    port: 465,
    auth: {
        user: 'nida.waheed@visnext.net',
        pass: 'xjhu hytd vsrh bdtq'
    }
});
 
  const mailOptions = {
    from: 'nida.waheed@visnext.net',
    to: 'nidawaheed506@gmail.com',
    subject: `${user.name} - Your Project Assignment`,
    text: `Hi ${user.name}, You are assigned to a new project.`
  };


  console.log('Sendign email')
  transporter.sendMail(mailOptions, (error, info) => {
    console.log("hello");
    if (error) {
      console.error("Error:", error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendEmail };
