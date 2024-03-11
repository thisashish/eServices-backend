<<<<<<< HEAD
import { Schema, model } from "mongoose";

const userOtpSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

// user otp model
const userotp = new model("userotps", userOtpSchema);

export default userotp;
=======
import { Schema, model } from "mongoose";

const userOtpSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

// user otp model
const userotp = new model("userotps", userOtpSchema);

export default userotp;
>>>>>>> master
