import { Schema, model } from "mongoose";
import pkg from "bcryptjs";
const { hash } = pkg;
import pkg2 from "jsonwebtoken";
const { sign } = pkg2;

const USchema = new Schema({
  profilephoto: { type: String },
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  token: {
    type: String,
    required: true,
  },
});

// creating model
const Us = new model("Us", USchema);

export default Us;
