import pool from "../utils/dbConnection.js";
import localDate from '../utils/localDate.js';

const branchsList = async (req,res) => {
    try {
        const [list] = await pool.query(`
        SELECT *
        FROM branch
       `);
       // convert date to local date
       list.map((ele) => {
       ele.start_day = localDate(ele.start_day);
       });
       return res.status(200).json({message : 'get all branches with success',branches : list});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'internal error'}); 
    }
}


export default branchsList;