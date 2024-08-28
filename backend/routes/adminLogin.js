import express from 'express';
import jwt from 'jsonwebtoken';
import pool from "../utils/dbConnection.js";

export const loginRouter = express.Router();

loginRouter.get('/adminlogin',async (req,res) => {
    try {
    const {email,password} = req.body;
    const [currentuser] = await pool.query(`
        SELECT *
        FROM user
        WHERE email=?
    `,[email]);
    const user = currentuser[0];
    if (!user)
       return res.status(403).json({loginStatus : false, message : `user don 't exist`}); 
    if (user.user_password !== password)
        return res.status(403).json({loginStatus : false, message : `password wrong`});
    // select employee role
    const roleID = user.role_id;
    const [rolearray] = await pool.query(`
        SELECT role_name
        FROM roles
        WHERE role_id=?
    `,[roleID]);
    const roleName = rolearray[0].role_name;
    // making jwt tokens
    const accessToken = jwt.sign({
        userInfo : {
            email : user.email,
            roles : roleName
        }},
        process.env.access_token_secret,
        {
            expiresIn : '300s'
        }
    );
    const refreshToken = jwt.sign({
        email : user.email
        },
        process.env.refresh_token_secret,
        {
            expiresIn : '1d'
        }
    );
    console.log(refreshToken);
    res.cookie('jwt',refreshToken,{httpOnly : true, maxAge : 1000 * 60 * 60 * 24});
    return res.status(200).json({loginStatus : true, message : 'login with success', accessToken : accessToken}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({loginStatus : false, message : 'internl error'});
    }
});