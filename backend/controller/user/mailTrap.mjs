import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const mailTrap=async (email,token)=>{
     // Create a transporter object using the default SMTP transport
const transporter =nodemailer.createTransport({
    host: process.env.MHOST,
    port: process.env.MPORT,
    auth: {
        user: process.env.MUSER,
        pass: process.env.MPASS
    }
});
// Set up email data with unicode symbols
const mailOptions = {
    from:'np05cp4s230012@iic.edu.np',
    to: email,
    subject: 'Token for Password Reset',
    text:token,
    replyTo:'np05cp4s230012@iic.edu.np'
};
// Send mail with defined transport object
await transporter.sendMail(mailOptions);
};

export default mailTrap;