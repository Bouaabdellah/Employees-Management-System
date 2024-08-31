import pool from '../../utils/dbConnection.js';
import exist from '../../config/exist.js';

const addBranch = async (req,res) => {
    try {
       const {branchName,mgrID,startDay} = req.body;
       // if the user don 't enter information
       if (!branchName || !mgrID || !startDay)
        return res.status(400).json({message : 'branch name and manager id and start date are required'});
       // confirm that manager exist
       const existMGR = await exist('user','id',mgrID);
        if (!existMGR)
            return res.status(400).json({message : `the manager that have id = ${mgrID} don 't exist`});
       // add the branch
       let [managerName] = await pool.query(`
        SELECT firstname,lastname FROM user
        WHERE id=?
        `,[mgrID]);
        managerName = managerName[0].firstname + ' ' + managerName[0].lastname;
       await pool.query(`
        INSERT INTO branch(branch_name,mgr_id,start_day)
        values(?,?,?)
        `,[branchName,mgrID,startDay]);
        return res.status(201).json({message : `add the branch ${branchName} with success, it will managed by ${managerName}`});
        // 201 something created
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'internal error'});
    }
}

export default addBranch;