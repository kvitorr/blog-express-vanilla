import { Usuario } from "../entidades/Usuario"
import UsuarioRepository from "../repository/UsuarioRepository"
import { sign } from "jsonwebtoken";



class LoginService {

    public getToken = async (user: Usuario) => {
        const payload = {
            id: user.cod_usuario, 
            email: user.email, 
            nome: user.nome
        }

        const token = sign(payload, process.env.SECRET_KEY as string, { expiresIn: '15m'})

        return token;

    }
    


}


export default new LoginService()   