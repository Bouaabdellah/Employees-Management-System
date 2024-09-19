import exist from "../../config/exist.js";
import pool from "../../utils/dbConnection.js";
import bcrypt from 'bcrypt'

const makeMofications = async (req,res) => {
    try {
    const {firstname,lastname,sex,birthdate,email,password,id} = req.body;
    if (!firstname || !lastname || !sex || !birthdate || !email || !password || !id)
        return res.status(400).send({message : `don 't have required informations`});
    // check if employee exist
    const employee = await exist('user', 'id',id);
    if (!employee)
        return res.status(400).send({message : `employee don 't exist`});
    // generate crypted password
    const salt = await bcrypt.genSalt(10);
    const hashedPWD = await bcrypt.hash(password,salt);
    await pool.query(`
        UPDATE user
        SET firstname=?, lastname=?, sex=?, birthday=?, email=?, user_password=?
        WHERE id=?
        `,[firstname,lastname,sex,birthdate,email,hashedPWD,id]);
    return res.status(200).send({message : `modify profile with success`});    
    } catch (error) {
     console.log(error);   
    }
}

export default makeMofications;