import db from '../../connect/connect.js';

const deleteData=(req,res)=>{
    try{

        const {data}=req.body;
        //console.log(data);
       const sql='DELETE FROM data WHERE Noteid=(?)';
        db.query(sql,[data],(err,result)=>{
            if(err){
                res.json({message:`error deleting the note:${err}`})
            }
            else{
                res.send('Note Deleted');
            }
        })
    }catch(e){
        console.log(e);
    }
}
export default deleteData;