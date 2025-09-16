import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';

export const protect = async(req,res,next)=>{
    try {
        let token=req.headers.authorization;

        if(token &&token.startsWith("Bearer")){
            token=token.split(" ")[1]; // Extract token
            const decode=jwt.verify(token, process.env.JWT_SECRET);
            req.user=await User.findById(decode.id).select("-password");
            next();
        }else{
            res.status(401).json({message:"Not Authorized, no Token"});
        }
    } catch (error) {
        res.status(401).json({message:"Token failed",error:error.message}); 
    }
}