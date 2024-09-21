import pool from '../../utils/dbConnection.js';
import localDate from '../../utils/localDate.js';

const getAllEmployees = async (req,res) => {
    try {
        const [employees] = await pool.query(`
        SELECT id,firstname,lastname,sex,email,birthday,start_day,
        salary,super_id,branch_id,role_id,image_url, is_manager
        FROM user
        `);
        employees.map((ele) => {
            ele.birthday = localDate(ele.birthday);
            ele.start_day = localDate(ele.start_day);    
        });
        return res.status(200).json({message : 'get all employees with success',employees : employees});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'internal error'});
    }
}

export default getAllEmployees;