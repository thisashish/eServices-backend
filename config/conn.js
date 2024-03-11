import { connect } from "mongoose";
import dotenv from "dotenv"; 

dotenv.config(); 
const DB = process.env.DATABASE;

connect(DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => console.log("Database connected"))
  .catch((error) => {
    console.log("error", error);
  });
