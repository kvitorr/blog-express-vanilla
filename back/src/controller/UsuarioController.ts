import { Comentario } from "../entidades/Comentario"
import { Post } from "../entidades/Post"
import { Request, Response, NextFunction } from 'express'
import UsuarioService from "../service/UsuarioService"
import { Usuario } from "../entidades/Usuario"



class UsuarioController {

    public createUsuario = async (request: Request , response: Response, next: NextFunction) => {
        const { email, senha, nome } = request.body
        const newUsuario: Usuario = await UsuarioService.createUsuario(email, senha, nome)

        const { senha: _, ...usuarioLogged } = newUsuario

        response.status(201).json(usuarioLogged)
    }
}

export default new UsuarioController()