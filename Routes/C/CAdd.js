<<<<<<< HEAD
import { Router } from "express";
import multer, { diskStorage } from "multer";
import C from "../../models/CSchema.js";
const router = Router();
const storage = diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Initialize the multer middleware with the storage engine
const upload = multer({ storage, limits: { fileSize: 5000 * 1024 * 1024 } });

router.post("/", upload.single("img"), async (req, res) => {
  const res1 = await C.insertMany([
    {
      name: req.body.name,
      img: req.file.path,
      locations: req.body.locations,
    },
  ]);
});

export default router;
=======
import { Router } from "express";
import multer, { diskStorage } from "multer";
import C from "../../models/CSchema.js";
const router = Router();
const storage = diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Initialize the multer middleware with the storage engine
const upload = multer({ storage, limits: { fileSize: 5000 * 1024 * 1024 } });

router.post("/", upload.single("img"), async (req, res) => {
  const res1 = await C.insertMany([
    {
      name: req.body.name,
      img: req.file.path,
      locations: req.body.locations,
    },
  ]);
});

export default router;
>>>>>>> master
