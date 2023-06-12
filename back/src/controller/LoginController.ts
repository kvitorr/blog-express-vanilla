import { Response, Request } from 'express'
import UsuarioService from '../service/UsuarioService'
import bcrypt from 'bcrypt'
import LoginService from '../service/LoginService'
import { BadRequestError } from '../utils/api-errors'

class LoginController {

    public login = async (request: Request , response: Response) => {
        const { email, senha } = request.body

        const userFound = await UsuarioService.getUsuarioByEmail(email)

        const { senha: _, ...userLogged } = userFound

        const isUserValid: boolean = await bcrypt.compare(senha, userFound.senha);

        if(isUserValid) {   
            const token = await LoginService.getToken(userFound)

            response.status(200).json({
                userLogged,
                token
            })
        } else {
            throw new BadRequestError('Email ou senha inválidos');
        }
    }
}

export default new LoginController()