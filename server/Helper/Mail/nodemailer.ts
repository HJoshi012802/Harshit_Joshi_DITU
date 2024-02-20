import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';


export const nmail =async (email:string,api_key:string)=>{


    let config={
        service:'gmail',
        auth:{
        user:process.env.TS_GMAIL,
        pass:process.env.TS_PASS,
        }
    }
    
    let transporter=nodemailer.createTransport(config);
    
    transporter.verify(function(error, success) {
    if (error) {
    console.log(error);
    } 
    else 
    {
    console.log('Server is ready to take our messages');
    }
    });
    let MailGenerator =new Mailgen({
    theme:"default",
    product:{
        name:"Harshit's Server For Movers & Packers",
        link:"https://mailgen.js"
    }
    })
    
    let response ={
    body:{
    name:"Movers & Packers",
    intro:"Reset Password",
    table:{
    data:[{
    item:'Reset Password',
    description:`This Is The access Key to Reset Password ${api_key}`,
    }]},
    outro:"Looking Forward to do more business"
    }
    }
    
    let mail = MailGenerator.generate(response);
    
    let message ={
    from:process.env.TS_GMAIL,
    to: email,
    subject:`Reset Password for${email}`,
    text:`Hi , This Is Your Email for Reset Password Access Key Given To You`,
    html:mail,
    }
    
    transporter.sendMail(message).then(()=>{
    console.log("Notification for Reset Password Is Send !!");       
    }).catch(e=>{
    console.log(e);
    })
}

//Okay Tested Email Is Sending