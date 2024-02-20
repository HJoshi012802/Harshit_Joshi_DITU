import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../Model/user";
import { nmail } from "./nodemailer";


export const sendMail =async (req:Request,res:Response)=>{
    
    const{email,password}=req.body;
     
    if(email){
       const user= await User.findOne(email);
       
       if(!user){
        return res.status(400).json({ok:false,message:"Not Registered"}) ;
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password) ;
    if(!isPasswordMatch){
        return res.status(400).json({ok:false,message:"Invalid Credentials"}); 
    }else{
        const access_Key = jwt.sign({role:"Admin"},process.env.TS_JWT_SECRET_KEY||" ",{expiresIn : '12h'}) ;

        await nmail(email,access_Key);
        res.send("Email Is Send To Intrested User");
    }
    }
}

//Okay Tested Email Is Sending