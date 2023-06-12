import { Pool, QueryResult } from "pg";
import { BadRequestError, NotFoundError } from "../utils/api-errors";
import db from "../database/db";
import { Usuario } from "../entidades/Usuario";
import bcrypt from 'bcrypt'


class UsuarioRepository {

    public createUsuario = async (usuario: Usuario): Promise<void> => {
        const scriptBusca = `
        SELECT *
        FROM usuario
        WHERE email = $1 
        `;
    
        const UsuarioFound: QueryResult<Usuario> = await db.query<Usuario>(scriptBusca, [usuario.email]);
        
        if(UsuarioFound.rowCount != 0) {
            throw new BadRequestError('Usuario already exists');
        }
        
        const hashPassword = await bcrypt.hash(usuario.senha, 10)

        const scriptInsert = `
        INSERT INTO usuario(email, senha, nome)
        VALUES($1, $2, $3) 
        `;
    
        await db.query<Usuario>(scriptInsert, [usuario.email, hashPassword, usuario.nome]);
    }
    
    public getUsuarioByEmail = async (email: string): Promise<Usuario> => {
        const scriptBusca = `
        SELECT *
        FROM usuario
        WHERE email = $1 
        `;
    
        const { rows } = await db.query<Usuario>(scriptBusca, [email])
    
        if (rows.length === 0) {
            throw new NotFoundError('Usuário not found');
        }
    
        return rows[0]
    }
    
}

export default new UsuarioRepository()