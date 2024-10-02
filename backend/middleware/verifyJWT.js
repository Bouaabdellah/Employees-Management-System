import jwt from 'jsonwebtoken';
import refreshAccessToken from '../config/refAccessTok.js';
import redis from 'redis';

const client = redis.createClient();
client.on('error',(err) => console.log(err));
await client.connect();

const handleJWT = async (req,res,next) => {
    let accessToken = req.cookies.accessToken;
    const notexistAccess = accessToken === undefined;
    const refreshToken = req.cookies.jwt;
    if (notexistAccess && !refreshToken)
        return res.status(401).json({message : "unothorized you don 't have both of tokens"});
    if (notexistAccess && refreshToken){
       const blRefreshToken = client.get('refreshToken');
       if (refreshToken === blRefreshToken)
        return res.status(401).json({message : "you login out, refresh token is invalid"}); 
       accessToken = await refreshAccessToken(req,res); 
    }
    if (!notexistAccess){
    const blAccessToken = client.get('accessToken');    
    if (accessToken === blAccessToken)
        return res.status(401).json({message : "you login out, access token is invalid"});
    }
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