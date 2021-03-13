const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req,res, next) => {

    try {
        let token = req.header("x-auth-token");

        if(!token){
            return res.status(400).json({error:'No Token, Authentication Denied!'})
        }

        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{

            if(err){
            return res.status(400).json({error:'InVaild token, Authentication Denied!'})
            }
            else {
                req.user = decoded.user;
                next();
            }
        });
        
    } catch (error) {
        console.log('something wrong with auth middleware..');
        return res.status(500).json({error:'Server Error'});
    }
}

module.exports =  auth;