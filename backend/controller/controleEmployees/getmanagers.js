import pool from "../../utils/dbConnection.js";

const getManagers = async (req,res) => {
    try {
       const [managers] = await pool.query(`
        SELECT DISTINCT super_id FROM user
        WHERE super_id IS NOT NULL
        `); 
        return res.status(200).json({message : 'get managers with success', managers : managers});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'internal error'});
    }
}

export default getManagers;