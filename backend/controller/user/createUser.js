import User from '../../model/seqModel.js';
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CN,
    api_key:process.env.AK ,
    api_secret: process.env.AS
  });


const createUser=async (req,res)=>{
    try{
        if(!req.file){
            return res.status(400).send("File is required")
        }

        const {userName,email,password}=req.body;
        //console.log(req.file);
        const x=await cloudinary.uploader.upload(req.file.path);
        //console.log(x);
       // console.log(userName,email,password);
        const user=await User.create({userName,email,password,userImage:x.url});
        fs.unlink((req.file.path),(err)=>{
            if(err){
                console.log(err);
            }
        })
        res.send(user);
    }
    catch(err){
        console.log("error creating user"+err);
    }
}
export default createUser;