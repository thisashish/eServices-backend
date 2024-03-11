<<<<<<< HEAD
import { Schema, model } from "mongoose";
import validator from "validator";

const profileSchema = new Schema({
  name:{
type:String,
  },
  img: {
    type: String,
    require: false,
  },
  
});

// category otp model
const Profile = new model("profiles", profileSchema);

// export default Profile;

module.exports = Profile;
=======
import { Schema, model } from "mongoose";
import validator from "validator";

const profileSchema = new Schema({
  name:{
type:String,
  },
  img: {
    type: String,
    require: false,
  },
  
});

// category otp model
const Profile = new model("profiles", profileSchema);

// export default Profile;

module.exports = Profile;
>>>>>>> master
