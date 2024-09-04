import pool from '../utils/dbConnection.js';
import express from 'express';
import handlJWT from '../middleware/verifyJWT.js';

const roleID = express.Router();
roleID.get('/',handlJWT,async (req,res) => {
    const {role_name} = req.query;
    if (!role_name)
        return res.status(400).json({message : "role name are required"});
    const [role] = await pool.query(`
        SELECT role_id from roles
        WHERE role_name=?
        `,[role_name]);
    if (!role.length)
        return res.status(400).json({message : "role name don 't exist"});
    return res.status(200).json({roleID : role[0].role_id});
});

export default roleID;