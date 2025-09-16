import express, { Router } from 'express'
import { getprofile, login, registerUser } from '../Controllers/user.cont.js'
import { protect } from '../Middleware/auth.midd.js';
import { upload } from '../Middleware/upload.midd.js';

const router=express.Router()

router.post("/register",registerUser);
router.post("/login",login);
router.get("/profile",protect,getprofile);

router.post("/upload-image",upload.single("image"),(req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"NO File Uploaded"});
    }
    const imageUrl=`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({imageUrl})
});

export default router;
