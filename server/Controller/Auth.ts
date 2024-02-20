import { RequestHandler,Request,Response, NextFunction } from "express";
import { valiadationSchema } from '../Helper/joi.validation';
import { User } from "../Model/user";
import { Admin } from "../Model/admin";
import { Driver } from "../Model/driver";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

interface UserData{
  name:string,
  email:string,
  password:string
}

export const registerUser: RequestHandler =async(req:Request,res:Response) =>{
    const data:UserData=req.body;
    try{
        const result =await valiadationSchema.validateAsync(data);
     }catch(err){
        return res.status(402).send(err);
     }
     
     let user=await User.findOne({email:data.email});
     if(user) {return res.status(400).send("User already Registered")};
     
     try{
         const User_create=await User.create({
             name:data.name,
             email:data.email,
             password:data.password,
         });
 
         const salt = await bcrypt.genSalt(10);
         User_create.password=await bcrypt.hash(User_create.password,salt);
     
         
         await User_create.save();
 
         const name:string = data.name;
         console.log(`${name} is Created Into The User Database`);
        return res.status(200).json(User_create);
     }catch(e){
         console.log('Error in Creating User In the Database!');
         res.status(400).send("Error in Creating User In the Database!");
     }
}



export const userSignIn : RequestHandler = async (req:Request,res:Response) => {
    try{
        const data:UserData = req.body;
        const {email,password} =data;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({ok:false,message:"Not Registered"}) ;
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password) ;
        if(!isPasswordMatch){
            return res.status(400).json({ok:false,message:"Invalid Credentials"}); 
        }
        const authToken = jwt.sign({genid : user._id,role:"User"},process.env.TS_JWT_SECRET_KEY||" ",{expiresIn : '12h'}) ;
        const refreshToken = jwt.sign({genid : user._id,role:"User"},process.env.TS_JWT_REFRESH_SECRET_KEY||" ",{expiresIn : '24h'}) ;


        res.cookie('authToken',authToken,({httpOnly : true})) ;
        res.cookie('refreshToken',refreshToken,({httpOnly:true})) ;
        console.log(authToken);
        return res.status(200).json({userId:user._id, authToken:authToken, refreshToken:refreshToken, name:user.name,}) ;

    }
    catch(err){
        return res.status(403).send("Login Failed..") ;
    }
}

export const logout : RequestHandler = async (req:Request,res:Response) => {
    try{
        res.clearCookie('authToken') ;
        res.clearCookie('refreshToken') ;
        return res.status(200).json({ok:true,message:"logged out"}) ;
    }
    catch(err) {
        return res.status(400).json({ok:true,message:"Error logged out"}) ;
    }
}


export const registerAdmin : RequestHandler = async (req:Request,res:Response) => {
    try{
       const result =await valiadationSchema.validateAsync(req.body)
    }catch(err){
       return res.status(402).send(err);
    }
    
    let admin=await Admin.findOne({email:req.body.email});
    if(admin) {return res.status(400).send("Admin already Registered ")};
    
    try{
        const Admin_create=await Admin.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        });

        const salt = await bcrypt.genSalt(10);
        Admin_create.password=await bcrypt.hash(Admin_create.password,salt);
    
        
        await Admin_create.save();

        const name:String = req.body.name;
        console.log(`${name} is Created Into The Admin Database `);
       return res.status(200).json(Admin_create);
    }catch(e){
        console.log('Error in Creating Admin In the Database!');
        return res.status(400).send("Error in Creating Admin In the Database!");
    }
}



export const adminSignIn : RequestHandler = async (req:Request,res:Response) => {
    try{
        const data:UserData = req.body ;
        const {email,password} =data;

        const admin= await Admin.findOne({email});
        
        if(!admin){
            return res.status(400).json({ok:false,message:"Not Registered"}) ;
        }
          
        const isPasswordMatch = await bcrypt.compare(password,admin.password) ;
        if(!isPasswordMatch){
            return res.status(400).json({ok:false,message:"Invalid Credentials"}); 
        }
        const authToken = jwt.sign({genid : admin._id,role:"Admin"},process.env.TS_JWT_SECRET_KEY||" ",{expiresIn : '12h'}) ;
        const refreshToken = jwt.sign({genid : admin._id,role:"Admin"},process.env.TS_JWT_REFRESH_SECRET_KEY||" ",{expiresIn : '24h'}) ;

        res.cookie('authToken',authToken,({httpOnly : true})) ;
        res.cookie('refreshToken',refreshToken,({httpOnly:true})) ;
        console.log(authToken);
        return res.status(200).json({userId:admin._id,authToken:authToken, refreshToken:refreshToken, name:admin.name, role:"Admin"}) ;
    }
    catch(err){
        return res.status(403).send("Admin Login Failed..") ;
    }
}

export const registerDriver: RequestHandler =async(req:Request,res:Response) =>{
    const data:UserData=req.body;
    try{
        const result =await valiadationSchema.validateAsync(data);
     }catch(err){
        return res.status(402).send(err);
     }
     
     let driver=await Driver.findOne({email:data.email});
     if(driver) {return res.status(400).send("Driver already Registered")};
     
     try{
         const driver_create=await Driver.create({
             name:data.name,
             email:data.email,
             password:data.password,
         });
 
         const salt = await bcrypt.genSalt(10);
         driver_create.password=await bcrypt.hash(driver_create.password,salt);
     
         
         await driver_create.save();
 
         const name:string = data.name;
         console.log(`${name} is Created Into The Driver Database`);
        return res.status(200).json(driver_create);
     }catch(e){
         console.log('Error in Creating Driver In the Database!');
         res.status(400).send("Error in Creating Driver In the Database!");
     }
}



export const driverSignIn : RequestHandler = async (req:Request,res:Response) => {
    try{
        const data:UserData = req.body;
        const {email,password} =data;

        const driver = await Driver.findOne({email});

        if(!driver){
            return res.status(400).json({ok:false,message:"Not Registered"}) ;
        }

        const isPasswordMatch = await bcrypt.compare(password,driver.password) ;
        if(!isPasswordMatch){
            return res.status(400).json({ok:false,message:"Invalid Credentials"}); 
        }
        const authToken = jwt.sign({genid : driver._id,role:"User"},process.env.TS_JWT_SECRET_KEY||" ",{expiresIn : '12h'}) ;
        const refreshToken = jwt.sign({genid : driver._id,role:"User"},process.env.TS_JWT_REFRESH_SECRET_KEY||" ",{expiresIn : '24h'}) ;


        res.cookie('authToken',authToken,({httpOnly : true})) ;
        res.cookie('refreshToken',refreshToken,({httpOnly:true})) ;
        console.log(authToken);
        return res.status(200).json({driverId:driver._id, authToken:authToken, refreshToken:refreshToken}) ;

    }
    catch(err){
        return res.status(403).send("Login Failed..") ;
    }
}





