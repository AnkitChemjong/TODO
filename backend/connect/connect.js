import mysql from 'mysql2';

const db=mysql.createConnection({
     user:'root',
     host: 'localhost',
     password:'',
     database:'todo'
});

db.connect((err)=>{
 if(err){
    console.log(err);
 }
 else{
    console.log('connected to database');
 }
});
export default db;