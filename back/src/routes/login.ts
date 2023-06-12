import { Router } from 'express'
import LoginController from '../controller/LoginController';

export const loginRoutes = Router()

loginRoutes.post('/login', LoginController.login)


