import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config();

export const verifyMail = async (token, email) => {
  const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.mailUser,
      pass: process.env.mailPass,
    },
  });

  const mailConfigarations = {
    from: process.env.mailUser,
    to: "abhigyan.senguptaofficial@gmail.com",
    subject: "Email Veerifiation",
    text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           http://localhost:5173/user/verify/${token} 
           Thanks`,
  };

  transpoter.sendMail(mailConfigarations, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
      throw new Error(error);
    } else {
      console.log("Email Sent Successfully");
      console.log(info);
    }
  });
};

export default verifyMail;