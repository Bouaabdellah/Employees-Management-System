import jwt from 'jsonwebtoken';

const handleJWT = (req,res,next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken)
        return res.status(401).json({message : 'unothorized'});
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