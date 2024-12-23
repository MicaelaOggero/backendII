import { Router } from "express";
import { authorization } from "../middlewares/authorization.js";
import { passportCall } from "../utils/passportCall.utils.js";
import userModel from "../models/user.model.js"

const router = Router()

//MOSTRAR ESTUDIANTES
router.get('/', passportCall("jwt"),
authorization(["student"]),async (req, res) => {
    try {
        const teachers = await userModel.find({ roles: 'teacher' });

        if (teachers.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios con rol teacher' });
        }

        res.json(teachers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
});

export default router
