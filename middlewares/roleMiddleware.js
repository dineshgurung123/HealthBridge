

const roleMiddleware = (...roles) =>{


    return (req, res, next) =>{ 


        if(!roles.includes(req.user.role)){
            return res.status(403).json({message : "Access denied for this routes due to insufficient access"})

            
        }

        next();

    }


}

module.exports = {roleMiddleware}   