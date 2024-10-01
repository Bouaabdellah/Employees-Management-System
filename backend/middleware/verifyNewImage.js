import pool from "../utils/dbConnection.js";
import fs from 'file-system';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import makeMofications from "../controller/controleEmployees/modifyEmp.js";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hashImage = (buffer) => {
    return new Promise((res,rej) => {
        const hash = crypto.createHash('md5');
        hash.update(buffer);
        res(hash.digest('hex'));
    });
} 

const verifyNewImage = async (req,res,next) => {
    try {
    // check if there is an image
    const {id} = req.body;
    const userID= +id;
    if (!id)
        return res.status(400).send({message : `don 't have required informations`}); 
    const [olderImage] = await pool.query(`
        SELECT image_url from user
        where id=?
        `,[userID]);
    // check if user have image
    if (!olderImage[0].image_url)
       return next(); 
    // check if its profile image exist in the puplic/imgs folder
    const oldImagePath = path.join(__dirname,'../puplic/imgs',olderImage[0].image_url);
    if (!fs.existsSync(oldImagePath))
        return next();
    const newImage = req.file.buffer;
    const newImageHash = await hashImage(newImage);
    const oldImageHash = await hashImage(fs.readFileSync(oldImagePath));
    // check if it is different from the new one 
    if (newImageHash === oldImageHash){
        req.body.imageName = olderImage[0].image_url;
        return makeMofications(req,res);  
    }
    fs.unlink(oldImagePath,(err) => {
        if (err){
            console.log(err);
            return;
        }
    });
    return next();                  
    } catch (error) {
        console.log(error);
        return res.send(500).json({message : 'error in verifyNewImage'});
    }
}

export default verifyNewImage;