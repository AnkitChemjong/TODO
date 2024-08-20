import { Sequelize } from "sequelize";

const sequelize=new Sequelize('todo','root','',{
    host:'localhost',
    dialect:'mysql',
    logging:false,
});

sequelize.authenticate().then(()=>{
    console.log('authenticated');
}).catch(()=>{console.log("failed to authenticate")});

export default sequelize;