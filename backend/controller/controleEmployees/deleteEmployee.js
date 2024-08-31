import pool from '../../utils/dbConnection.js';
import exist from '../../config/exist.js';

const deleteEmployee = async (req,res) => {
    try {
    const {empID} = req.body;
    if (!empID)
        return res.status(400).json({message : "employee id are required"});
    // determine if the employee exist
    const [empExist] = await exist('user','id',empID);
    if (!empExist)
        return res.status(400).json({message : `the employee that have id = ${empID} don 't exist`});   
    await pool.query(`
        DELETE FROM user
        WHERE id=?
        `,[empID]);
    return res.status(204).json({message : 'delete with success'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'internal error'});
    }  
}

export default deleteEmployee;