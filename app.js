import express from 'express'
import dotenv from 'dotenv'
import courseRoutes from './src/routes/course.routes.js'
import userRoutes from './src/routes/users.routes.js'
import studentRoutes from './src/routes/students.routes.js'
import teacherRoutes from './src/routes/teachers.routes.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import initializePassport from './src/config/passport.config.js'
import passport from 'passport'

dotenv.config()
const app= express()
app.use('/static', express.static('public'))

app.use(express.json())
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())

app.use('/api/users', userRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/teachers', teacherRoutes)
app.use('/api/students', studentRoutes)


mongoose.connect(process.env.MONGO)

app.listen(process.env.PORT, ()=> console.log("server in port: " + process.env.PORT))