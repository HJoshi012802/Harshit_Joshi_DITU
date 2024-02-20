import mongoose from "mongoose";


const DriverSchema =new mongoose.Schema({
name:{
    type:String,
    required:true,
},
email:{
   type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
},
contactNumber:{
    type:Number,
    require:true,
},
KYCDocuments:String,
vehicleId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vehicle', 
},
currentlocation: {
    type: String,
    default: ""
},
});

const Driver =mongoose.model('driver',DriverSchema);

export {Driver};