import passport from "passport";
import local from 'passport-local'
import jwt, { ExtractJwt } from 'passport-jwt'
import GithubStrategy from 'passport-github2'
import userModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashing.utils.js";

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy

const initializePassport =()=>{
    //PARA VERIFICAR SI EL USUARIO ESTA LOGUEADO
    passport.use('jwt', new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req && req.cookies ? req.cookies["coderPracticaIntegradora"] : null]),
            secretOrKey:process.env.SECRET_JWT
        },
        async (jwt_payload, done)=>{
            try {
                return done(null, jwt_payload.user)
            } catch (error) {
                return done(error)
            }
        }
    ))

    //REGISTRO LOCAL
    passport.use('register', new LocalStrategy (
        {
            passReqToCallback:true,
            usernameField:'email'
        },
        async (req, username, password, done) =>{
            const {firstName, lastName, age, roles} = req.body

            try {
                const user= await userModel.findOne({email:username})
                if(user) return done(null, false,{message:'Student already exists'})

                const newUser ={
                    email:username,
                    password:createHash(password),
                    roles,
                    firstName,
                    lastName,
                    age
                }

                const result = await userModel.create(newUser)
                return done(null, result)

            } catch (error) {
                return done(error)
            }
        }
    ))

    //LOGUEO
    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });
                if (!user) return done(null, false, { message: 'User not found' });
                if (!isValidPassword(user, password)) return done(null, false, { message: 'Invalid password' });
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));
    

    //LOGUEO CON GITHUB
    passport.use('github', new GithubStrategy(
        {
            clientID:'Iv23livgII8wbKowjVJe',
            clientSecret:'381736c2db3b23e97a4b5a750476d7ec2c984b01',
            callbackURL: 'http://localhost:8080/api/users/githubcallback'
    
        }, async (_,__,profile,done)=>{
            try {
                const user = await userModel.findOne({idGithub:profile._json.id}) 
                if(user) return done(null, user)
                
                const newUser ={
                    firstName:profile._json.name,
                    idGithub:profile._json.id
                }

                const result=await userModel.create(newUser)
                return done(null,result)

            } catch (error) {
                done(error)
            }
        }
    ))

}

export default initializePassport