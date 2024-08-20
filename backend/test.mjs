import {createHash, randomBytes} from  'crypto';
import bcrypt from 'bcrypt';
(async function (){

    const value=await bcrypt.genSalt();
    const value2=randomBytes(10).toString('hex');
    const h=createHash('sha256').update(value2).digest('hex');
    console.log(value2);
    console.log(h)
    console.log(value);
})();