const jwt = require('jsonwebtoken');

const protectedRoute = async (req, res, next) => {
    try {  
        const token = req.headers['authorization']; 
        if (!token ) {
            return res.status(401).send({
                message: "Unauthorized, token missing or invalid",
                success: false
            });
        }
         

        const decodedToken =  jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decodedToken._id; 
        next();
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Auth error",
            success: false
        });
    }


}

module.exports = {protectedRoute};
