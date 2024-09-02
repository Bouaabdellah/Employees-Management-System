import express from 'express';
import jwt from 'jsonwebtoken';
import pool from "../utils/dbConnection.js";
import bcrypt from 'bcrypt';

const loginRouter = express.Router();

loginRouter.post('/login',async (req,res) => {
    try {
    const {email,password} = req.body;
    if (!email || !password)
        return res.status(400).json({loginStatus : false, message : `email and password are required`});
    const [currentuser] = await pool.query(`
        SELECT *
        FROM user
        WHERE email=?
    `,[email]);
    const user = currentuser[0];
    if (!user)
       return res.status(401).json({loginStatus : false, message : `user don 't exist`}); 
    const correctPWD = await bcrypt.compare(password,user.user_password);
    if (!correctPWD)
        return res.status(401).json({loginStatus : false, message : `password wrong`});
    // making jwt tokens
    const accessToken = jwt.sign({
        userInfo : {
            email : user.email,
            role : user.role_id
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
    res.cookie('jwt',refreshToken,{httpOnly : true, maxAge : 1000 * 60 * 60 * 24});
    return res.status(200).json({loginStatus : true, message : 'login with success', accessToken : accessToken}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({loginStatus : false, message : 'internl error'});
    }
});

export default loginRouter;