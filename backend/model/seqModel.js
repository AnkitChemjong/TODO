import sequelize from "../connect/seqConnect.js";
import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';

const User=sequelize.define('User',{
   userName:{
    type:DataTypes.STRING,
   allowNull:false,
},
email:{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{isEmail:true},
    unique:true
},
password: {
  type: DataTypes.STRING,
  allowNull: false
},
salt:{
  type:DataTypes.STRING,
  allowNull: true
     }
     ,
     userImage:{
      type:DataTypes.STRING,
      allowNull:false
     },
     resetSalt:{
      type:DataTypes.STRING,
      allowNull: true
     },
     resetToken:{
      type:DataTypes.STRING,
      allowNull:true
     },
     tokenExpirationDate:{
      type:DataTypes.DATE,
      allowNull:true
     }
});

User.beforeSave(async function (user,option){
  if (user.changed('password')){
     const salt=await bcrypt.genSalt(10);
     const hashedPassword=await bcrypt.hash(user.password, salt);
     user.password = hashedPassword;
     user.salt=salt;
  };
});

User.getUser=async function (email,password){
    const user=await this.findOne({where:{email:email}});
    // if(user?.email===email){
    //   console.log("same")
    // }
    // else{
    //   console.log(  "dis")
    // }
    if(!user) throw new Error("User not found");
    const check=await bcrypt.compare(user.password,password);
    if(!check) new Error("pass incorrect");
    return user;
};

export default User;