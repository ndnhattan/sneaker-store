const nodemailer = require("nodemailer");

const sendMail = async ({ email, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Sneakerholic 👻" <no-reply@sneakerholic.com>', // sender address
    to: email, // list of receivers
    subject: "Xác thực tài khoản đăng kí", // Subject line
    html: html, // html body
  });

  return info;
};

module.exports = sendMail;
