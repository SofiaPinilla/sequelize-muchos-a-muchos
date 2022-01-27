const nodemailer = require("nodemailer");
const { AUTH } = require("./config.json")['development'];

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: AUTH,
});

module.exports = transporter;
