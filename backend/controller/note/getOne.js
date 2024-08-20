import db from '../../connect/connect.js';

const getOne=(req,res)=>{
    const {id}=req.body;
   const sql='SELECT * FROM data where Noteid=(?)';
    db.query(sql,[id],(err,result)=>{
        if(err){
            res.json({message:`error creating the database:${err}`})
        }
        else{
            const note=result[0];
            res.status(200).json(note);
            console.log(result[0].Noteid);

        }
    })
}
export default getOne;