import express from 'express';
import jwt from 'jsonwebtoken';
import redis from 'redis';
import handleJWT from '../middleware/verifyJWT.js';

const logoutRouter = express.Router();
const client = redis.createClient();
client.on('connect',() => {
    console.log('connecting to redis client');
});
client.on('error', (err) => {
    console.error('Redis connection error:', err);
});
await client.connect();
await client.ping();

const getExpiredTime = (token) => {
    const decoding = jwt.decode(token);
    const expiredIn = decoding.exp - Math.floor(Date.now() / 1000);
    return Math.max(expiredIn,0);
}

logoutRouter.post('/',handleJWT,async (req,res) => {
    // decode teh tokens to get the expired time
    const accessTokenExpire = getExpiredTime(req.cookies.accessToken);
    const refreshTokenExpire = getExpiredTime(req.cookies.jwt);
    client.set('accessToken',req.cookies.accessToken,{
    EX : accessTokenExpire
    },(err) => {
        if (err)
            return res.status(500).json({message : 'error in saving access token in redis blacklist'});
        res.clearCookie('accessToken',{httpOnly : true, path : '/',
            domain : `localhost`});
    });
    client.set('refreshToken',req.cookies.jwt,{
        EX : refreshTokenExpire
    },(err) => {
        if (err)
            return res.status(500).json({message : 'error in saving access token in redis blacklist'});
        res.clearCookie('jwt',{httpOnly : true, path : '/',
            domain : `localhost`});
    });
    return res.status(200).json({message : 'logging out with sucess'});
});

export default logoutRouter;