import User from "../../model/seqModel.js";
import {createHmac} from 'crypto';

const resetPassword=async (req,res)=>{
    const email=req.params.email;
    const {password}=req.body;
    try
    {
       const user=await User.findOne({where:{email:email}});
       const userSalt=user.salt;
       const newHashedPassword=createHmac('sha256',userSalt).update(password).digest('hex');
       user.password=newHashedPassword;
       user.resetSalt=null;
       user.resetToken=null;
       user.tokenExpirationDate=null;
       await user.save();
       res.json({message: 'Password changed'})
    }
    catch(err){
     res.json({message:err.message});
    }
}

export default resetPassword;