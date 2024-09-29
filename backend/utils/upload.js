import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname,'../puplic/imgs'));
    },
    filename : (req,file,cb) => {
        const imageName = `${file.fieldname + '_' + Date.now() + path.extname(file.originalname)}`;
        cb(null,imageName);   
        req.body.imageName = imageName; 
    }
});

const upload = multer({storage : storage});

export default upload;