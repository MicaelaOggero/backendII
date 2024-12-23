import { Router } from "express";
import courseModel from "../models/course.model.js";
import { authorization } from "../middlewares/authorization.js";
import { passportCall } from "../utils/passportCall.utils.js";

const router = Router();

//CREAR CURSO
router.post(
  "/createCourse",
  passportCall("jwt"),
  authorization(["teacher"]),
  async (req, res) => {
    const { name, description, code, schedule } = req.body;

    try {
      const newCourse = { name, description, code, schedule };

      const result = await courseModel.create(newCourse);

      const roles = req.user.roles;

      console.log(newCourse);
      console.log(roles);

      res.status(201).json({
        message: "Course created successfully",
        course: result,
        roles: roles,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

//MOSTRAR CURSO
router.get(
  "/",
  passportCall("jwt"),
  authorization(["teacher", "student"]),
  async (req, res) => {
    try {
      const user = req.user;
      const courses = await courseModel.find({});
      res.status(200).json({
        roles: user.roles,
        courses,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
);

//BUSCAR CURSO ESPECIFICO
router.get('/:id', passportCall("jwt"),
authorization(["teacher"]),async (req, res) => {
  try {
      const course = await courseModel.findById(req.params.id);

      if (!course) {
          return res.status(404).json({ message: 'Curso no encontrado' });
      }

      const updateData = {
          name: course.name || "Nombre no especificado",
          description: course.description || "Sin descripción",
          schedule: course.schedule || "Sin horario",
      };

      res.json(updateData);

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el curso' });
  }
});

//ACTUALIZAR CURSO
router.patch('/:id', passportCall("jwt"),
authorization(["teacher"]),async (req, res) => {
  
  try {
      const course = await courseModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!course) {
          return res.status(404).json({ message: 'Curso no encontrado' });
      }
      res.json({ message: 'Curso actualizado exitosamente', course });
  } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el curso' });
  }
});

export default router;
