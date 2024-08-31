import pool from '../../utils/dbConnection.js';
import exist from '../../config/exist.js';

const deleteBranch = async (req,res) => {
    try {
    const {branchID} = req.body;
    if (!branchID)
        return res.status(400).json({message : "branch id are required"});
    // determine if the branch exist
    const existBranch = await exist('branch','branch_id',branchID)
    if (!existBranch)
        return res.status(400).json({message : `the branch that have id = ${branchID} don 't exist`});  
    await pool.query(`
        DELETE FROM branch
        WHERE branch_id=?
        `,[branchID]);
    return res.status(204).json({message : 'delete with success'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'internal error'});
    }  
}

export default deleteBranch;