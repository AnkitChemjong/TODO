import multer from 'multer';
import path from 'path';


const storage=multer.diskStorage({
     destination:(req,file,cb)=>{
        const dest=path.resolve('./upload/');
        return cb(null,dest);
     },
     filename:(req,file,cb)=>{
        const name=`${Date.now()}-${file.originalname}`;
        return cb(null,name);
     }
});
const fileFilterer=(req,file,cb)=>{
   //console.log(file.mimetype)
   const allowedTypes=['image/jpeg', 'image/png', 'image/gif'];
   if(allowedTypes.includes(file.mimetype)){
      return cb(null,true);

   }
   else{
      return cb(new Error("file not allowed to upload..."),false);
   }
}

const upload=multer({storage:storage,fileFilter:fileFilterer,limits:{
   fileSize:1024*1024
}});
export default upload;