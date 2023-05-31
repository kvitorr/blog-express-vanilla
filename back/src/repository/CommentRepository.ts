import { Comentario } from "../entidades/Comentario";
import { Pool, QueryResult } from "pg";
import { BadRequestError, NotFoundError } from "../utils/api-errors";
import db from "../database/db";

class CommentRepository {

    public createComment = async (comentario: Comentario): Promise<void> => {
        const scriptBusca = `
        SELECT cod_comentario, conteudo, cod_post, created_at
        FROM comentario
        WHERE cod_comentario = $1 
        `;
    
        const scriptInsert = `
        INSERT INTO comentario
        VALUES($1, $2, $3) 
        `;
    
        const commentFound: QueryResult<Comentario> = await db.query<Comentario>(scriptBusca, [comentario.cod_comentario]);
    
        
        if(commentFound.rowCount != 0) {
            throw new BadRequestError('Comment already exists');
        }
    
        await db.query<Comentario>(scriptInsert, [comentario.cod_comentario, comentario.conteudo, comentario.cod_post]);
    }
    
    
    public getAllComments = async (): Promise<Comentario[]> => {
        const scriptBusca = `
        SELECT cod_comentario, conteudo, cod_post, created_at
        FROM comentario
        `;
    
        const { rows } = await db.query<Comentario>(scriptBusca)
    
        return rows
    }
    
    public getCommentById = async (id: string): Promise<Comentario> => {
        const scriptBusca = `
        SELECT cod_comentario, conteudo, cod_post, created_at
        FROM comentario
        WHERE cod_comentario = $1
        `;
    
        const { rows } = await db.query<Comentario>(scriptBusca, [id])
    
        if (rows.length === 0) {
            throw new NotFoundError('Commnet not found');
        }
    
        return rows[0]
    }
    
    public updateComment = async(comentario: Comentario): Promise<void> => {
        const scriptUpdate = `
        UPDATE comentario
        SET conteudo = $1
        WHERE cod_comentario = $2
        `
        
        await db.query(scriptUpdate, [comentario.conteudo, comentario.cod_comentario])
    }
    
    public deleteCommentById = async (id: string): Promise<void> => {
        const scriptDelete = `
        DELETE FROM comentario
        WHERE cod_comentario = $1
        `
        await db.query(scriptDelete, [id])
    }
}

export default new CommentRepository()