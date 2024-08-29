const handlRoles = (...enteredRoles) => {
    return (req,res,next) => {
        const allowedRoles = [...enteredRoles];
        const userRole = req.role;
        const existRole = allowedRoles.find(ele => ele === userRole);
        if (!existRole)
            return res.status(401).json({message : "unothorized, you don 't have the requirement role"});
        next();
    }
};

export default handlRoles;