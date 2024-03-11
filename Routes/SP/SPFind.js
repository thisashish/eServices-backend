import { Router } from "express";
import SP from "../../models/SPSchema.js";
const router = Router();

router.get("/one", async (req, res) => {
  res.send(await SP.findOne({ token: req.cookies.SPToken }));
});

export default router;
