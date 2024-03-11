<<<<<<< HEAD
import { Schema, model } from "mongoose";

const SPSchema = new Schema({
  name: { type: String, required: false },
  address: { type: String },
  phoneno: { type: String, required: false },
  email: { type: String },
  password: { type: String, required: false },
  token: { type: String, required: false },
  locations: [{ type: String }],
  categories: [{ type: String }],
  img: {
    type: String,
    required: false, // Adjusted from 'require' to 'required'
  },
  review: [
    {
      userid: String,
      review: String,
      rating: Number,
    },
  ],
  transactions: [{ type: String, amount: Number }],
});

const SP = model("ServiceProviders", SPSchema); // Adjusted model name to 'ServiceProviders'

export default SP;
=======
import { Schema, model } from "mongoose";

const SPSchema = new Schema({
  name: { type: String, required: false },
  address: { type: String },
  phoneno: { type: String, required: false },
  email: { type: String },
  password: { type: String, required: false },
  token: { type: String, required: false },
  locations: [{ type: String }],
  categories: [{ type: String }],
  img: {
    type: String,
    required: false, // Adjusted from 'require' to 'required'
  },
  review: [
    {
      userid: String,
      review: String,
      rating: Number,
    },
  ],
  transactions: [{ type: String, amount: Number }],
});

const SP = model("ServiceProviders", SPSchema); // Adjusted model name to 'ServiceProviders'

export default SP;
>>>>>>> master
