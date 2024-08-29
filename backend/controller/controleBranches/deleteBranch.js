import pool from '../../utils/dbConnection.js';

const deleteBranch = async (req,res) => {
    const {branchName} = req.body;
    if (!branchName)
        return res.status(400).json({message : "branch name are required"});
    // determine if the branch exist
    const [branchExist] = await pool.query(`
        SELECT branch_id
        FROM branch
        WHERE branch_name=?
        `,[branchName]);
    if (!branchExist.length)
        return res.status(400).json({message : `the branch ${branchName} don 't exist`});   
    await pool.query(`
        DELETE FROM branch
        WHERE branch_id=?
        `,branchExist[0].branch_id);
    return res.status(204).json({message : `delete the branch ${branchName} with success`});
}

export default deleteBranch;