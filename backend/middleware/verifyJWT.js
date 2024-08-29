import jwt from 'jsonwebtoken';

const handleJWT = (req,res,next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer '))
        return res.status(401).json({message : 'unothorized'});
    const accessToken = authHeader.split(" ")[1]; // Barear Token
    jwt.verify(
        accessToken,
        process.env.access_token_secret,
        (err,decoded) => {
        if (err)
            return res.status(401).json({message : 'unothorized'});
        req.email = decoded.userInfo.email;
        req.role = decoded.userInfo.role;
        next();
        });
};

export default handleJWT;