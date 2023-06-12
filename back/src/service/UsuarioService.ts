import { Usuario } from "../entidades/Usuario"
import UsuarioRepository from "../repository/UsuarioRepository"

class UsuarioService {


    public createUsuario = async (email: string, senha: string, nome: string): Promise<Usuario> => {
        const newUsuario: Usuario = {
            email,
            senha,
            nome
        }
          
        await UsuarioRepository.createUsuario(newUsuario)
        return newUsuario;
    }

    public getUsuarioByEmail = async (email: string): Promise<Usuario> => {
        return await UsuarioRepository.getUsuarioByEmail(email)
    }


}


export default new UsuarioService()