const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authmiddleware = (req,res,next) => {
    const authheader = req.headers.authorization;

    if(!authheader || !authheader.startsWith('Bearer ')){
        return res.status(403).json({});
    }
    const token = authheader.split(' ')[1];
    try{
        const decoded = jwt.verify(token , secret)
        req.userid = decoded.userid //req me userId dalke bheja haii us route me jaha pe bhi authmiddleware use hoga
        next();
    }catch(err){
        return res.status(403).json({
            message : "Authentication successful"
        })
    }
}

module.exports = authmiddleware;
