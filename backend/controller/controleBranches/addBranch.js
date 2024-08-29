import pool from '../../utils/dbConnection.js';

const addBranch = async (req,res) => {
    try {
       const {branchName,mgrID,startDay} = req.body;
       // if the user don 't enter information
       if (!branchName || !mgrID || !startDay)
        return res.status(400).json({message : 'branch name and manager id and start date are required'});
       // confirm that manager exist
       const [manager]  = await pool.query(`
        SELECT firstname,lastname
        from user
        where id=?
        `,[mgrID]);
       if (!manager.length)
        return res.status(400).json({message : "the manager don 't exist"});
       // add the branch
       const managerName = manager[0].firstname + ' ' + manager[0].lastname;
       await pool.query(`
        INSERT INTO branch(branch_name,mgr_id,start_day)
        values(?,?,?)
        `,[branchName,mgrID,startDay]);
        res.status(201).json({message : `add the branch ${branchName} with success, it will managed by ${managerName}`});
        // 201 something created
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'internal error'});
    }
}

export default addBranch;