import User from "../../model/seqModel.js";
import {createHmac,randomBytes} from 'crypto';

const checkResetToken =async (req,res) =>{
   const email=req.params.email;
   const {token}=req.body;
   try
   {
      const user=await User.findOne({where:{email:email}});
      const userSalt=user.resetSalt;
      const getToken=createHmac('sha256',userSalt).update(token).digest('hex');
      const date=Date.now();
      if(getToken===user.resetToken&& date<=user. tokenExpirationDate){
        res.json({message:'Token matched',email:user.email});
      }
      else{
        res.json({message:'Invalid token or token expired'});
      }
      
   }
   catch(err){
    res.json({message:err.message});
   }
}

export default checkResetToken;