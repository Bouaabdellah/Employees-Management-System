import express from 'express';
import jwt from 'jsonwebtoken';
import redis from 'redis';
import handleJWT from '../middleware/verifyJWT.js';

const logoutRouter = express.Router();
const client = redis.createClient();
client.on('error',(err) => console.log(err));
await client.connect();

const getExpiredTime = (token) => {
    const decoding = jwt.decode(token);
    const expiredIn = decoding.exp - Math.floor(Date.now() / 1000);
    return expiredIn;
}

logoutRouter.post(handleJWT,(req,res) => {
    // decode teh tokens to get the expired time
    const accessTokenExpire = getExpiredTime(req.cookies.aceessToken);
    const refreshTokenExpire = getExpiredTime(req.cookies.refreshToken);
    client.set('accessToken',req.cookies.aceessToken,'EX',accessTokenExpire,(err) => {
        if (err)
            return res.status(500).json({message : 'error in saving access token in redis blacklist'});
        req.clearCookie('accessToken');
    });
    client.set('refreshToken',req.cookies.refreshToken,'EX',refreshTokenExpire,(err) => {
        if (err)
            return res.status(500).json({message : 'error in saving access token in redis blacklist'});
        req.clearCookie('refreshToken');
    });
    return res.status(200).json({message : 'logging out with sucess'});
});

export default logoutRouter;