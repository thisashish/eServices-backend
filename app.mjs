//imports

////pkg
import { config } from "dotenv";
import cookies from "cookie-parser";
import express from "express";
import { json } from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

////file
import URoutes from "./Routes/User/URoutes.js";
import category from "./models/CSchema.js";
import CFind from "./Routes/C/CFind.js";
import CAdd from "./Routes/C/CAdd.js";
import CDelete from "./Routes/C/CDelete.js";

import "./config/conn.js";

import SPAdd from "./Routes/SP/SPAdd.js";
import SPDashboard from "./Routes/SP/SPDashboard.js";
import SPLogin from "./Routes/SP/SPLogin.js";
import SPFind from "./Routes/SP/SPFind.js";

//use

////pkg
config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(json());
app.use(cors());
app.use(cookies());


app.use("/U", URoutes);
app.use("/service/provider", SPDashboard);


app.use("/SP/add", SPAdd);
app.use("/SP/login", SPLogin);
app.use("/SP/find", SPFind);

app.use("/C/find", CFind);
app.use("/C/add", CAdd);
app.use("/C/delete",CDelete);


//server
app.listen(4001, () => {
  console.log(`Server start at Port No :${4001}`);
});

export default app;