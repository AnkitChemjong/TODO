import User from "../../model/seqModel.js";
import {randomBytes,createHmac} from 'crypto';
import mailTrap from "./mailTrap.mjs";



const genResetToken = async (req,res)=>{
    const {email}=req.body;
 const user=await User.findOne({where: {email: email}});
 if(user){
      const token=randomBytes(10).toString('hex');
      const resetSalt=randomBytes(10).toString('hex');
      const hashedToken=createHmac('sha256',resetSalt).update(token).digest('hex');
      user.resetSalt=resetSalt;
      user.resetToken=hashedToken;
      user.tokenExpirationDate=Date.now()+10*60*1000;
      await user.save();
      try{
          console.log(user.dataValues);
          await mailTrap(email,token);
          res.json({message:"get the token from email"});
      }
      catch(error){
        user.resetSalt=null;
        user.resetToken=null;
        user.tokenExpirationDate=null;
        await user.save();
        res.json({message:error.message});
      }
 }
 else{
    res.json({message:"User of that email is not available"})
 } 
};

export default genResetToken;