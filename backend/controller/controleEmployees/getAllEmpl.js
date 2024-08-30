import pool from '../../utils/dbConnection.js';

const getAllEmployees = async (req,res) => {
    try {
        const [employees] = await pool.query(`
            SELECT id,firstname,lastname,sex,email,birthday,start_day,salary,super_id,branch_id,role_id 
            FROM user
            `);
        return res.status(200).json({message : 'get all employees with success',employees : employees});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'internal error'});
    }
}

export default getAllEmployees;