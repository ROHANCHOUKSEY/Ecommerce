const jwt = require("jsonwebtoken");

const verifytoken = async (req, res) => {
    const {token} = req.cookies;

    if(!token){
        return res.status(400).json({message:"Not Authorized Login Again"});
    }

    try{
        const decodeToken =jwt.verify(token, process.env.JWT_SECRETKEY);
        req.user = decodeToken;
        next();
    }catch(error){
        console.log("Token is not decode: ", error);
    }
 
}; 

module.exports = verifytoken;
