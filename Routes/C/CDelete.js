<<<<<<< HEAD
import { Router } from "express";
import C from "../../models/CSchema.js";
const router = Router();

router.post("/one/byid", async (req, res) => {
  console.log(req.body);
  const deletecat = await C.deleteOne({ _id: req.body.id });
  res.status(200).send("Success");
});

export default router;
=======
import { Router } from "express";
import C from "../../models/CSchema.js";
const router = Router();

router.post("/one/byid", async (req, res) => {
  console.log(req.body);
  const deletecat = await C.deleteOne({ _id: req.body.id });
  res.status(200).send("Success");
});

export default router;
>>>>>>> master
