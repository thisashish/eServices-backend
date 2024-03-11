import express, { Router } from "express";
import { Login, OtpSend, Register } from "./UControllers/auth.js";
const router = Router();
import nodemailer from "nodemailer";
import Us from "../../models/USchema.js";
import cookies from "cookie-parser";
const app = express();
app.use(cookies());
import jwt from "jsonwebtoken";
import userotp from "../../models/UOtp.js";
import bcrypt from "bcryptjs";

//auth routes
router.post("/auth/register", async (req, res) => {
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
  const presuer = await userotp.find({ email: req.body.inputdata.email });

  const OTP = Math.floor(100000 + Math.random() * 900000);
  const mailOptions = {
    from: process.env.EMAIL,
    to: req.body.inputdata.email,
    subject: "Sending Email For Otp Validation",
    text: `OTP:- ${OTP}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    } else {
    }
  });
  if (presuer.length === 0) {
    await userotp.insertMany([{ email: req.body.inputdata.email, otp: OTP }]);
    res.send("otp sent");
  } else {
    await userotp.updateOne({ email: req.body.inputdata.email }, { otp: OTP });
    res.send("otp sent");
  }
});
router.post("/auth/verifyotp", async (req, res) => {
  const founduser = await userotp.findOne({ email: req.body.userdata.email });
  if (founduser.otp === req.body.otp) {
    var token = jwt.sign(
      { email: req.body.userdata.email },
      process.env.JWTKEY
    );
    bcrypt.hash(req.body.userdata.password, 15, async function (err, hash) {
      await Us.insertMany([
        {
          fname: req.body.userdata.fname,
          password: hash,
          profilephoto: "",
          email: req.body.userdata.email,
          token: token,
        },
      ]);
    });
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 36000000),
    };
    res.cookie("UToken", token, options);
    res.send("user registered");
  } else {
    res.send("wrong otp");
  }
});

router.get("/find/one", async (req, res) => {
  res.send(await Us.findOne({ token: req.cookies.UToken }));
});

router.post("/auth/login", async (req, res) => {
  const user = await Us.findOne({ email: req.body.inputdata.email });
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
      res.cookie("UToken", user.token, options);
      res.send("success");
    } else {
      res.send("wrong pass");
    }
  } else {
    res.send("email not registered");
  }
}); //logout
router.get("/auth/logout", async (req, res) => {
  res.clearCookie("UToken");
  res.status(200).send("Logout Success");
});

export default router;
