import pool from "../utils/dbConnection.js";

const branchsList = async (req,res) => {
    try {
        const [list] = await pool.query(`
        SELECT *
        FROM branch
       `);
       return res.status(200).json({message : 'get all branches with success',branches : list});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'internal error'}); 
    }
}


export default branchsList;