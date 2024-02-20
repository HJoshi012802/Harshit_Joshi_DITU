import mongoose from "mongoose";


const VehicleSchema =new mongoose.Schema({
VehicleNumber:{
    type:String,
    required:true,
    unique:true
},
VehicleType:{
    type: String,
    enum: ["Two", "Four"],
    required: true
},
VehicleDocuments:String,
AssignDriver: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
},
});

const Vehicle =mongoose.model('vehicle',VehicleSchema);

export {Vehicle};