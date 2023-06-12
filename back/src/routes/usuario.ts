import {Router } from 'express'
import UsuarioController from '../controller/UsuarioController'

export const usuarioRoutes = Router()

usuarioRoutes.post('/usuario', UsuarioController.createUsuario)


