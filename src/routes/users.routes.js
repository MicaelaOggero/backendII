import { Router } from "express";
import { generateToken } from "../utils/generateToken.utils.js";
import { passportCall } from "../utils/passportCall.utils.js";
import userModel from "../models/user.model.js";

const router = Router()

//REGISTRO
router.post('/register',passportCall('register'),async (req, res)=>{
    
    try {
        if(!req.user) return res.status(400).json({message:"registration failed"})

        //el token se guarda en el navegador del usuario
        const token = generateToken(req.user)
        //guardo el token en una cookie
        res.cookie('coderPracticaIntegradora', token, {httpOnly:true}).json({message:"Registered user"})

    } catch (error) {
        res.status(400).json(error)
    }
    
})

//LOGIN
router.post('/login', passportCall('login'), async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ message: "Login failed" });
        
        const token = generateToken(req.user);

        res.cookie('coderPracticaIntegradora', token, { httpOnly: true });

        res.json({
            message: 'Logged in user',
            roles: req.user.roles // Incluye el rol del usuario en la respuesta
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// LOGOUT
router.get('/logout', (req,res) =>{
    res.clearCookie('coderPracticaIntegradora').json({message: "logged out"})
})

// LOGIN CON GITHUB
router.get('/github', passportCall('github'))

router.get('/githubcallback', passportCall('github'), (req,res)=>{
    
    try {
        if(!req.user) return res.status(401).json({message:'Invalid credentials'})
        const token = generateToken(req.user)
        res.cookie('coderPracticaIntegradora', token, {httpOnly:true}).send('logged in user')
    } catch (error) {
        res.status(400).send(error)
    }

})

//DATOS DEL USUARIO LOGUEADO
router.get('/current', passportCall('jwt'), async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ user }); 

    } catch (error) {
        res.status(400).json({ message: 'Error retrieving user', error: error.message });
    }
});

//ACTUALIZAR DATOS DE USUARIO
router.patch('/update', passportCall('jwt'), async (req, res) => {
    const { firstName, lastName, email, age } = req.body;

    const updateData = {};

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (age) updateData.age = age;

    try {
        const userId = req.user._id;  

        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

        res.status(200).json({
            message: 'Usuario actualizado correctamente',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error.message);
        res.status(400).json({ message: 'Error al actualizar los datos del usuario', error: error.message });
    }
});

export default router