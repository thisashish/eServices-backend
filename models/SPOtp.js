<<<<<<< HEAD
import { Schema, model } from "mongoose";

const SPOtpSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  otp: {
    type: Number,
    require: true,
  },
});

// user otp model
const SPOtp = new model("serviceproviderOtps", SPOtpSchema);

export default SPOtp;
=======
import { Schema, model } from "mongoose";

const SPOtpSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  otp: {
    type: Number,
    require: true,
  },
});

// user otp model
const SPOtp = new model("serviceproviderOtps", SPOtpSchema);

export default SPOtp;
>>>>>>> master
