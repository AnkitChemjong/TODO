import db from '../../connect/connect.js';

const updateData=(req,res)=>{
    const id=req.params.id;
    const {title,content}=req.body;
    const time=new Date().toISOString().slice(0, 19).replace('T', ' ');
   const sql='UPDATE data SET title=(?),content=(?),updatedTime=(?) WHERE Noteid=(?)';
    db.query(sql,[title,content,time,id],(err,result)=>{
        if(err){
            res.json({message:`error updating the note:${err}`})
        }
        else{
            res.send(`Note Updated of Id ${id}`);
        }
    })
}
export default updateData;