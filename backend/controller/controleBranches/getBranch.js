import pool from '../../utils/dbConnection.js';
import localDate from '../../utils/localDate.js';

const getBranches = async (req,res) => {
    const {name,id} = req.query;
    if (!name && !id)
        return res.status(400).json({message : "you need at least one index"}); 
    const [branches] = await pool.query(`
        SELECT * FROM branch
        WHERE (branch_name LIKE ? OR ? IS NULL) 
        AND (branch_id LIKE ? OR ? IS NULL)
        `,[`${name || ''}%`,name,id,id]);
    if (!branches.length)
        return res.status(200).json({message : "branch don 't exist"});
    // convert start date to local date
    branches.map((ele) => {
        ele.start_day = localDate(ele.start_day);
    });
    return res.status(200).json({message : "serche the branch with success", branches : branches});
}

export default getBranches;