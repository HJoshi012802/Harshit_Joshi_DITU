import { RequestHandler,Request,Response } from "express";
import { valiadationSchema } from '../Helper/joi.validation';
import { User } from "../Model/user";
import { Admin } from "../Model/admin";
import { Driver } from "../Model/driver";
import { Vehicle } from "../Model/vehicle";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

interface DriverData{
    driverId:string,
    contactNumber:number
    KYCDocuments:String,
    vehicleId:string,
    currentlocation:string,
    fileUrl:string,
}

export const Adddriver : RequestHandler = async (req:Request,res:Response) => {
    try{
        const driver:DriverData= req.body;
        const{driverId,vehicleId}=driver;
        
        const found_driver=await Driver.findById(driverId);
        const found_vehical=await Driver.findById(vehicleId);
       
        if(!found_driver){
            return res.status(400).json({ok:false,message:"Not Registered"}) ;
        }else{
            await Driver.updateOne({_id:found_driver._id},{
            contactNumber:driver.contactNumber,
            KYCDocuments:driver.fileUrl,
            vehicleId:found_vehical?._id,
            currentlocation:driver.currentlocation,
            })
           const result=await found_driver.save();
        return res.status(200).send("Okay") ;
        }
    }
    catch(err){
        return res.status(403).send("Admin Cannot Verify Driver..");
    }
}

