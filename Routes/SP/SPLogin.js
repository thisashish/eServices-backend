import express, { Router } from "express";
import cookies from "cookie-parser";
const router = Router();
const app = express();
app.use(cookies());
router.get("/one", async (req, res) => {
  console.log(req.cookies.SPToken);
});
export default router;
