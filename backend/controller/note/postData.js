import db from '../../connect/connect.js';

const postData= async (req,res)=>{
    const {title,content}=req.body;
    const time=new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql='INSERT INTO data (title,content,createdTime,id) VALUES (?,?,?,?)';
    if (req.session && req.session.user) {
        req.user=req.session.user
        // console.log(req.user);
        // console.log("valid")
        // res.json({user:req.user});
        db.query(sql,[title,content,time,req.user.id],(err,result)=>{
                        if(err){
                            res.json({message:`error creating the database:${err}`})
                        }
                        res.send(result);
                    })
    } else {
       // console.log("Invalid")
        res.json({message:"User must be logged IN!"});
    }
  
}
export default postData;