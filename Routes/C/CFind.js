<<<<<<< HEAD
import { Router } from "express";
import C from "../../models/CSchema.js";
const router = Router();

router.get("/all", async (req, res) => {
  const founddata = await C.find();
  res.send(founddata);
});

export default router;
=======
import { Router } from "express";
import C from "../../models/CSchema.js";
const router = Router();

router.get("/all", async (req, res) => {
  const founddata = await C.find();
  res.send(founddata);
});

export default router;
>>>>>>> master
