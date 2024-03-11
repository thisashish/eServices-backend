import { Router } from "express";
import multer, { diskStorage } from "multer";

import SP from "../../models/SPSchema.js";
// import C from "../../models/CSchema";

const router = Router();
const storage = diskStorage({
  destination: "./uploads/service-provider",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Initialize the multer middleware with the storage engine
const upload = multer({ storage, limits: { fileSize: 5000 * 1024 * 1024 } });

router.post("/", upload.single("img"), async (req, res) => {
  try{
    console.log(req.file.path);
    console.log(req.body.name);
    const res1 = await  SP.create({
      name:req.body.name,
      img: req.file.path,
    });
  
  
    // const res1 = await SP.insertMany([
    //   {
    //     name: req.body.name,
    //     img: req.file.path,
    //     locations: req.body.locations,
    //   },
    // ]);

    // const res1 = await SP.insertMany([
    //   {
        
    //     img:req.file.path,
        
    //   },
    // ]);
    const savedDocument = await res1.save();
    res.json({ 
      message: 'File uploaded successfully',
      redirectTo: "http://localhost:3000/service-provider/dashboard" 
    });
  
    // res.redirect("http://localhost:3000/service-provider/dashboard");

  }catch(error){
    console.error('Error saving file path to database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
 
});





export default router;
