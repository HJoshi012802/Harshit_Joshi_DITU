import express from "express";
import { registerUser,userSignIn,logout,adminSignIn,registerAdmin,registerDriver,driverSignIn } from "../Controller/Auth";
import {resetPassword} from "../Controller/User";
import { sendMail } from "../Helper/Mail/sendmail";
import {checkRole,checkaccess} from "../Middleware/Access";
import {Adddriver} from "../Controller/Driver"
import {createVehicle} from "../Controller/Vehicle";
import {uploadImage} from '../Helper/UploadImage/uploadimagecloudinary';
import {upload} from '../Helper/UploadImage/uploadimagemulter';

const router =express.Router();

//Admin Features
router.post('/admin/register',registerAdmin);         
router.post('/admin/signup',adminSignIn);

router.post('/createVehicle',checkRole({allowedRoles: ['Admin']}),upload.single('image'), uploadImage,createVehicle);
router.post('/createDriver',checkRole({allowedRoles: ['Admin']}),upload.single('image'), uploadImage,Adddriver);

router.post('/driver/register',registerDriver);
router.post('/driver/signup',driverSignIn);

router.post('/register',registerUser);
router.post('/signup',userSignIn);
router.get('/logout',logout);

// Generate a link and send to email to reset password
router.post("/generateLink",sendMail);
router.post("/resetPassword/:key",checkaccess({allowedRoles: ['Admin']}),resetPassword)

// Accept user's request and assign driver
// Share driver details to user
router.post("/acceptrequest/:userId",checkaccess({allowedRoles: ['Admin']}),)

export {router};