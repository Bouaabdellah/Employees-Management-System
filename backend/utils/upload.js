import { fs } from 'file-system';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const upload = (req,res,next) => {
    const file = req.file;
    const imageName = `${file.fieldname + '_' + Date.now() + path.extname(file.originalname)}`;
    req.body.imageName = imageName;
    const imagePath = path.join(__dirname,'../puplic/imgs',imageName);
    fs.writeFile(imagePath,file.buffer,(err) => {
        if (err){
            console.error('error in saving image',err);
            return res.status(500).json({message : "error in saving file"});
        }
        return next();
    }); 
};

export default upload;