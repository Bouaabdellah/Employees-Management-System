import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../utils/dbConnection';

const refreshAccessToken = express.Router();

refreshAccessToken.get('/', async (req,res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt)
        return res.status(401).json({message : "you are unothorized"});
    const refreshToken = cookies.jwt;
    const {user} = req.body;
    // confirm that user exist
    const [existUser] = await pool.query(`
        SELECT * FROM user
        WHERE email=? AND role_id=?
        `,[user.email,user.role_id]);
    if (!existUser.length)
        return res.status(401).json({message : "you are unothorized"});
    jwt.verify(
        refreshToken,
        process.env.refresh_token_secret,
        (err,decoded) => {
            if (err || decoded.userInfo.email !== existUser.email)
                return res.status(401).json({message : "you are unothorized"});
            const newAccessToken = jwt.sign({
                userInfo : {
                    email : user.email,
                    role : user.role_id
                }},
                process.env.access_token_secret,
                {
                    expiresIn : '300s'
                });
            return res.status(200).json({refreshStatus : true, message : 'refresh access token with success',
                accessToken : newAccessToken});
        }
    )
});

export default refreshAccessToken;