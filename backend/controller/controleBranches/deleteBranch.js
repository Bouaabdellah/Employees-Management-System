import pool from '../../utils/dbConnection.js';

const deleteBranch = async (req,res) => {
    try {
    const {branchID} = req.body;
    if (!branchID)
        return res.status(400).json({message : "branch id are required"});
    // determine if the branch exist
    const [branchExist] = await pool.query(`
        SELECT *
        FROM branch
        WHERE branch_id=?
        `,[branchID]);
    if (!branchExist.length)
        return res.status(400).json({message : `the branch ${branchID} don 't exist`});   
    await pool.query(`
        DELETE FROM branch
        WHERE branch_id=?
        `,branchExist[0].branch_id);
    return res.status(204).json({message : `delete the branch ${branchExist[0].branch_name} with success`});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'internal error'});
    }
    
}

export default deleteBranch;