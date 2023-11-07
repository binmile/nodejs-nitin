import nodemailer from "nodemailer";
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "chaitanyamailer@gmail.com",
    pass: "lvwi mjcl jauy oyek",
  },
});

export const createTransportOptions = ({ to, subject, text }) => {
  return { from: "chaitanyamailer@gmail.com", to, subject, text };
};

export const sendMailService = (mailOption) =>
  new Promise((resolve, reject) => {
    transporter.sendMail(mailOption).then(resolve).catch(reject);
  });
