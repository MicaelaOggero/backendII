import bcrypt from 'bcrypt'

//crea el hash modificando la contraseña real
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//compara lo que el usuario ingresa con el hash guardado y devuelve verdadero o falso 
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)
