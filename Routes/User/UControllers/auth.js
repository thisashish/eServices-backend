import Us from "../../../models/USchema.js";
import Uotp from "../../../models/UOtp.js";
import nodemailer from "nodemailer";

const tarnsporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function Register(req, res) {
  const { fname, email, password } = req.body;
  if (!fname || !email || !password) {
    return res.status(400).json({ error: "Please Enter All Input Data" });
  }
  try {
    const presuer = await Us.findOne({ email: email });
    if (presuer) {
      return res.status(400).json({ error: "This U Allready exist in our db" });
    } else {
      const Uregister = new Us({
        fname,
        email,
        password,
      });
      // here password hasing
      const storeData = await Uregister.save();
      return res.status(200).json(storeData);
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid Details", error });
  }
}

export async function Login(req, res) {
  const { email, otp } = req.body;
  if (!otp || !email) {
    res.status(400).json({ error: "Please Enter Your OTP and email" });
  }

  try {
    const otpverification = await Uotp.findOne({ email: email });
    if (otpverification.otp === otp) {
      const preU = await Us.findOne({ email: email });
      // token generate
      const token = await preU.generateAuthtoken();
      res
        .status(200)
        .json({ message: "U Login Succesfully Done", UToken: token });
    } else {
      // res.status(400).json({error:"Invalid Otp"})
    }
  } catch (error) {
    // res.status(400).json({ error: "Invalid Details", error })
  }
}

export async function OtpSend(req, res) {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "Please Enter Your Email" });
  }

  try {
    const presuer = await Us.findOne({ email: email });

    if (presuer) {
      const OTP = Math.floor(100000 + Math.random() * 900000);

      const existEmail = await Uotp.findOne({ email: email });

      if (existEmail) {
        const updateData = await Uotp.findByIdAndUpdate(
          { _id: existEmail._id },
          {
            otp: OTP,
          },
          { new: true }
        );
        await updateData.save();

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Eamil For Otp Validation",
          text: `OTP:- ${OTP}`,
        };

        console.log("xxxxxxxxxxxxxxx");
        tarnsporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent", info.response);
            res.status(200).json({ message: "Email sent Successfully" });
          }
        });
      } else {
        const saveOtpData = new Uotp({
          email,
          otp: OTP,
        });

        await saveOtpData.save();
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Eamil For Otp Validation",
          text: `OTP:- ${OTP}`,
        };

        tarnsporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent", info.response);
            res.status(200).json({ message: "Email sent Successfully" });
          }
        });
      }
    } else {
      // res.status(400).json({ error: "This U Not Exist In our Db" })
    }
  } catch (error) {
    // res.status(400).json({ error: "Invalid Details", error })
  }
}
