import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "kanocudi.test@gmail.com",
    pass: "Ly4!h*mix*zS5PKjUNkmS57927kiRR",
  },
});

export default transporter;
