import pool from '../../utils/dbConnection.js';

const deleteEmployee = async (req,res) => {
    try {
    const {empID} = req.body;
    if (!empID)
        return res.status(400).json({message : "employee id are required"});
    // determine if the employee exist
    const [empExist] = await pool.query(`
        SELECT *
        FROM user
        WHERE id=?
        `,[empID]);
    if (!empExist.length)
        return res.status(400).json({message : `the employee that have id = ${empID} don 't exist`});   
    await pool.query(`
        DELETE FROM user
        WHERE id=?
        `,empID);
    return res.status(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'internal error'});
    }  
}

export default deleteEmployee;