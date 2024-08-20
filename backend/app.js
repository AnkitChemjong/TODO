import express from 'express';
import cluster from 'cluster';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import router from './routes/noteRoute.js';
import os from 'os';
import cors from 'cors';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import sequelize from "./connect/seqConnect.js";
dotenv.config();

const cpuLen=os.cpus().length;
if(cluster.isPrimary){
    for(let i=0; i<cpuLen; i++){
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
}
else{
    const app= express();
    const port=process.env.PORT ||8000;
    app.use(express.json())//for json data
    app.use(express.urlencoded({extended:false}));//for forms
   // Configure SequelizeStore
const sessionStore = new (SequelizeStore(session.Store))({
    db: sequelize,
    expiration: 86400000, // Session expiration time
    tableName: 'Session' // Optional: specify a custom session table name
  });
  sessionStore.on('error',(error)=>{
    console.log(error.message);
  })
    
    app.use(session({
        secret: 'session-secret',
        resave: false,
        saveUninitialized: false,
        store:sessionStore,
        cookie:{
           
            maxAge:86400000,
        },
        name:"cook"
    }));
     // Handle errors during initialization
     try {
        sessionStore.sync();
    } catch (error) {
        console.error('Session store sync error:', error);
    }
    app.use(cors({
        origin:process.env.FRONT,
        methods:['GET', 'POST', 'PUT', 'DELETE','PATCH'],
        allowedHeaders:['Content-Type','Authorization'],
        credentials:true
    }));
    sequelize.sync().then(()=>console.log("seq.connected")).catch(()=>console.log("seq.disconnected"));
    app.use('/',router);
    app.use('/user',userRouter);
    app.get('/him', (req, res) => {
        req.user=null;
        if (req.session && req.session.user) {
            req.user=req.session.user
            console.log(req.user);
            console.log("valid")
            res.json({user:req.user});
        } else {
           // console.log("Invalid")
            res.json({user:req.user});
        }
    });
    app.delete('/hatawnu',async (req,res)=>{
       req.session.destroy((err)=>{
        if(err){
            console.log("error",err);
        }
        res.clearCookie('cook'); // clear the session cookie
        console.log("cookie deleted")
        res.send('Session destroyed');
       })
    }) 
    
    app.listen(port,()=>{

        console.log('listening on port:'+port+':'+process.pid);
    })
}


