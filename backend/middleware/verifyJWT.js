import jwt from 'jsonwebtoken';
import refreshAccessToken from '../routes/refAccessTok.js';

const handleJWT = async (req,res,next) => {
    let accessToken = req.cookies.accessToken;
    const notexistAccess = accessToken === undefined;
    const refreshToken = req.cookies.jwt;
    if (!accessToken && !refreshToken)
        return res.status(401).json({message : 'unothorized'});
    if (!accessToken && refreshToken)
       accessToken = await refreshAccessToken(req,res); 
    jwt.verify(
        accessToken,
        process.env.access_token_secret,
        (err,decoded) => {
        if (err)
            return res.status(403).json({message : 'you are forbidden'});
        req.email = decoded.userInfo.email;
        req.role = decoded.userInfo.role;
        if (notexistAccess)
        res.cookie('accessToken',accessToken,{httpOnly : true, maxAge : 1000 * 300});
        next();
        });
};

export default handleJWT;