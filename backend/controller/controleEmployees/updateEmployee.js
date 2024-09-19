import exist from "../../config/exist.js";
import pool from "../../utils/dbConnection.js";

const updateEmployee = async (req,res) => {
    try {
    const {id,branchID,roleID,mgrID,startDate,salary} = req.body;
    if (!id || !branchID || !roleID || !mgrID || !startDate || !salary)
        return res.status(400).send({message : `don 't have required informations`});
    // check if employee exist
    const employee = await exist('user', 'id',id);
    if (!employee)
        return res.status(400).send({message : `employee don 't exist`});
    // modify work info
    await pool.query(`
        UPDATE user
        SET branch_id=?, role_id=?, super_id=?, start_day=?, salary=?
        WHERE id=?
        `,[branchID,roleID,mgrID,startDate,salary,id]);    
    } catch (error) {
     console.log(error);   
    }
}

export default updateEmployee;