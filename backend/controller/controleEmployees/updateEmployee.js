import exist from "../../config/exist.js";
import pool from "../../utils/dbConnection.js";

const updateEmployee = async (req,res) => {
    try {
    const {id,branchID,roleID,mgrID,startDate,salary,is_manager} = req.body;
    if (!id || !branchID || !roleID || !startDate || !salary || is_manager === undefined)
        return res.status(400).send({message : `don 't have required informations`});
    // check if employee exist
    const employee = await exist('user', 'id',id);
    // confirm that mgrID exist
    if (mgrID){
    const existMGR = await exist('user', 'id', mgrID);
    if (!existMGR)
        return res.status(400).json({ message: `the manager that have id = ${mgrID} don 't exist` });    
    }
    // confirm that branch exist
    const existBranch = await exist('branch', 'branch_id', branchID);
    if (!existBranch)
        return res.status(400).json({ message: `the branch that have id = ${branchID} don 't exist` });
    // confirm that role exist
    const existRole = await exist('roles', 'role_id', roleID);
    if (!existRole)
        return res.status(400).json({ message: `the role that have id = ${roleID} don 't exist` });
    if (!employee)
        return res.status(400).send({message : `employee don 't exist`});
    // modify work info
    await pool.query(`
        UPDATE user
        SET branch_id=?, role_id=?, super_id=?, start_day=?, salary=?, is_manager=?
        WHERE id=?
        `,[branchID,roleID,mgrID,startDate,salary,is_manager,id]);    
    } catch (error) {
     console.log(error);   
    }
}

export default updateEmployee;