import {RequestHandler,Request,Response} from 'express';
import {Vehicle} from '../Model/vehicle';
import { Admin } from '../Model/admin';
import jwt from 'jsonwebtoken';


type VType ="Two" |"Four";

interface vehicle{
    VehicleNumber:string
    VehicleType:VType
    VehicleDocuments?:string
    AssignDriver?:string,
    fileUrl:string,
}


export const createVehicle : RequestHandler =async(req,res)=>{
    const vehicledata:vehicle= req.body;


    let vehicle =await Vehicle.findOne({VehicleNumber:vehicledata.VehicleNumber})
    if(vehicle) {return res.status(400).send("Vehicle already Registered!!")}

    try{
        const newVehicle = new Vehicle({
            VehicleNumber:vehicledata.VehicleNumber,
            VehicleType:vehicledata.VehicleType,
            VehicleDocuments:vehicledata.fileUrl,
        });

         const vehicle= await newVehicle.save();

            
          return res.status(201).json({
            message: 'Vehicle created successfully',
            vehicle
          });
    }catch (error) {
        console.error(error);
        return res.status(500).send("Error in creating the Vehicle");
      }

 
}