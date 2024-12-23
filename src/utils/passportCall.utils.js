import passport from "passport"
//de aca va a usar la strategia de passport.config
export const passportCall = (strategy) =>{
    return async (req, res, next) =>{
        //PARA QUE SE EJECUTA INMEDIATAMENTE
        passport.authenticate(strategy, {session:false}, (error,user,info)=>{
            if(error) return next(error)
            if(!user) return res.status(401).json({error:info.message ? info.message : info.toString()})
            req.user = user 
            next()
        })(req,res,next)
    }
}