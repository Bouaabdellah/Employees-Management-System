import pool from '../../utils/dbConnection.js';

const getEmployee = async (req,res) => {
    try {
       const {firstName,lastName,id} = req.body;
       if (!firstName && !lastName && !id)
        return res.status(400).json({message : "you need at least one index"}); 
       const [employees] = await pool.query(`
        SELECT id,firstname,lastname,sex,email,birthday,start_day,salary,super_id,branch_id,role_id FROM user
        WHERE (firstname LIKE ? OR ? IS NULL)
        AND (lastname LIKE ? OR ? IS NULL)
        AND (id LIKE ? OR ? IS NULL)
        `,[`${firstName || ''}%`,firstName,
        `${lastName || ''}%`,lastName,
        id,id
        ]);
        if (!employees.length)
            return res.status(200).json({message : "employee don 't exist"});
        return res.status(200).json({message : "serche the employee with success", employees : employees});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'internal error'});
    }
}

export default getEmployee;