import jwt from 'jsonwebtoken';
import pool from '../utils/dbConnection.js';

const refreshAccessToken = async (req,res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt)
        return res.status(401).json({message : "you are unothorized"});
    const refreshToken = cookies.jwt;
    if (!refreshToken)
        return res.status(401).json({message : "you are unothorized"});
    const decoded = jwt.decode(refreshToken, { complete: true });
    const {email : adminEmail,role : adminRole_id} = decoded.payload.userInfo;
    if (!adminEmail || !adminRole_id)
        return res.status(400).json({message : "information are required"});
    // confirm that user exist
    const [existUser] = await pool.query(`
        SELECT * FROM user
        WHERE email=? AND role_id=?
        `,[adminEmail,adminRole_id]);
    if (!existUser.length)
        return res.status(401).json({message : "you are unothorized"});
    let newAccessToken = "";
    jwt.verify(
        refreshToken,
        process.env.refresh_token_secret,
        (err,decoded) => {
            if (!err || decoded.email === existUser.email)
            newAccessToken = jwt.sign({
                userInfo : {
                    email : adminEmail,
                    role : adminRole_id
                }},
                process.env.access_token_secret,
                {
                    expiresIn : '300s'
                });
        }
    )
    return newAccessToken;
};

export default refreshAccessToken;