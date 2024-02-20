import { RequestHandler,Request,Response } from "express";
import { User } from "../Model/user";
import bcrypt from "bcrypt";

export const resetPassword : RequestHandler = async (req:Request,res:Response) => {
    const {email,password,newpassword}=req.body;
  
    const user=await User.findOne({email:email});
    if(!user){
        return res.status(400).json({ok:false,message:"Not Registered"}) ;
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password) ;
    if(!isPasswordMatch){
        return res.status(400).json({ok:false,message:"Invalid Credentials"}); 
    }
     
     try{
        const user=await User.updateOne({email:email},{
        password:newpassword
        })
         console.log(`Update Into The User Database`);
        return res.status(200).json(user);
     }catch(e){
         console.log('Error in Updating User In the Database!');
         res.status(400).send("Error in Updating User In the Database!");
     }
}




