import pool from '../../utils/dbConnection.js';

const getRoleID = async (req,res) => {
    const {role_name} = req.query;
    if (!role_name)
        return res.status(400).json({message : "role name are required"});
    try {
       const [role] = await pool.query(`
        SELECT role_id from roles
        WHERE role_name=?
        `,[role_name]);
       if (!role.length)
        return res.status(400).json({message : "role name don 't exist"});
       return res.status(200).json({roleID : role[0].role_id}); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'internal error'});
    }
    
}

export default getRoleID;