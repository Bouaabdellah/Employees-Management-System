import pool from '../../utils/dbConnection.js';

const updateBranch = async (req,res) => {
    try {
        const {branchID,branchName,startDay,mgrID} = req.body;
        // if the user don 't enter information
       if (!branchName || !mgrID || !startDay || !branchID)
        return res.status(400).json({message : 'branch name and id and manager id and start date are required'});
       // confirm that branch exist
       const [branch]  = await pool.query(`
        SELECT *
        from branch
        where branch_id=?
        `,[branchID]);
       if (!branch.length)
        return res.status(400).json({message : "the branch don 't exist"});
       // confirm that manager exist
       const [manager]  = await pool.query(`
        SELECT firstname,lastname
        from user
        where id=?
        `,[mgrID]);
       if (!manager.length)
        return res.status(400).json({message : "the manager don 't exist"});
       const managerName = manager[0].firstname + ' ' + manager[0].lastname;
        await pool.query(`
            update branch
            set branch_name=?, mgr_id=?, start_day=?
            `,[branchName,mgrID,startDay]);
        return res.status(200).json({message : `update the branch ${branchName} with success, it will managed by ${managerName}`});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'internal error'});
    }
}

export default updateBranch;