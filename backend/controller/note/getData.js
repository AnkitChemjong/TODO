import db from '../../connect/connect.js';

const getData=(req,res)=>{
   const sql='SELECT * FROM data WHERE id = ?';
   if (req.session && req.session.user) {
    req.user=req.session.user
    // console.log(req.user);
    // console.log("valid")
    // res.json({user:req.user});
    db.query(sql,[req.user.id],(err,result)=>{
        if(err){
            res.json({message:`error creating the database:${err}`})
        }
        else{
            res.send(result);
        }
    })
} else {
   // console.log("Invalid")
   const result=[];
    res.send(result);
}
}
export default getData;