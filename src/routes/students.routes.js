import { Router } from "express";
import { authorization } from "../middlewares/authorization.js";
import { passportCall } from "../utils/passportCall.utils.js";
import userModel from "../models/user.model.js"

const router = Router()

//MOSTRAR PROFESORES
router.get('/', passportCall("jwt"),
authorization(["teacher"]),async (req, res) => {
    try {
        const students = await userModel.find({ roles: 'student' });

        if (students.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios con rol student' });
        }

        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
});

export default router
