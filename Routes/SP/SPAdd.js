import express, { Router } from "express";
const router = Router();
import cookies from "cookie-parser";
const app = express();
import bcrypt from "bcryptjs";
app.use(cookies());
import jwt from "jsonwebtoken";

import nodemailer from "nodemailer"; // email config
import SPOtp from "../../models/SPOtp.js";
import SP from "../../models/SPSchema.js";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
router.post("/sendotp", async (req, res) => {
  console.log(req.body);
  const chackotpexist = await SPOtp.find({
    email: req.body.email,
  });
  const OTP = Math.floor(100000 + Math.random() * 900000);
  const mailOptions = {
    from: process.env.EMAIL,
    to: req.body.email,
    subject: "Sending Eamil For Otp Validation",
    text: `OTP:- ${OTP}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    } else {
    }
  });
  if (chackotpexist.length !== 0) {
    await SPOtp.updateOne({ email: req.body.email }, { otp: OTP });
    res.send("otp send");
  } else {
    await SPOtp.insertMany([{ email: req.body.email, otp: OTP }]);
    res.send("otp send");
  }
});
router.post("/verifyotp", async (req, res) => {
  const foundotp = await SPOtp.findOne({
    email: req.body.formState.email,
  });
  console.log(foundotp.otp);
  console.log(req.body.otp);
  if (foundotp.otp == req.body.otp) {
    var token = jwt.sign(
      { email: req.body.formState.email },
      // process.env.JWTKEY
      "GU"
    );

    bcrypt.hash(req.body.formState.pass, 15, async function (err, hash) {
      await SP.insertMany([
        {
          name: req.body.formState.name,
          address: req.body.formState.adress,
          phoneno: req.body.formState.phoneno,
          email: req.body.formState.email,
          password: hash,
          profilephoto: "",
          locations: req.body.formState.locations,
          categories: req.body.formState.categories,
          token: token,
        },
      ]);
    });

    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 36000000),
    };
    res.cookie("SPToken", token, options);
    res.status(200).send("success");
  } else {
    res.send("Wrong OTP");
  }
});
router.get("/logout", async (req, res) => {
  res.clearCookie("SPToken");
  res.status(200).send("Logout Success");
});
router.post("/login", async (req, res) => {
  const user = await SP.findOne({ email: req.body.inputdata.email });
  if (user) {
    const match = await bcrypt.compare(
      req.body.inputdata.password,
      user.password
    );
    if (match) {
      const options = {
        httpOnly: true,
        expires: new Date(Date.now() + 36000000),
      };
      res.cookie("SPToken", user.token, options);
      res.send("success");
    } else {
      res.send("wrong pass");
    }
  } else {
    res.send("email not registered");
  }
});
export default router;
