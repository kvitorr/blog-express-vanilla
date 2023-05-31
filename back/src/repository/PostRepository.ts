import { Pool, QueryResult } from "pg";
import { Post } from "../entidades/Post";
import db from "../database/db";
import { BadRequestError, NotFoundError } from "../utils/api-errors";
import { Comentario } from "../entidades/Comentario";



class PostRepository {
    private db: Pool = db
    
    /*constructor(db: Pool){
        this.db = db;
    }*/

    public createPost = async (post: Post): Promise<Post> => {
        const scriptBusca = `
        SELECT cod_post, titulo, conteudo, likes, created_at, att_at
        FROM postagem
        WHERE cod_post = $1 
        `;

        const postFound: QueryResult<Post> = await  this.db.query<Post>(scriptBusca, [post.cod_post]);
 
        if(postFound.rowCount != 0) {
            throw new BadRequestError('Post already exists');
        }

        const scriptInsert = `
        INSERT INTO postagem 
        VALUES($1, $2, $3, $4, DEFAULT, DEFAULT) 
        `;


        await this.db.query<Post>(scriptInsert, [post.cod_post, post.titulo, post.conteudo, post.likes]);
        return post;
    }


    public getAllPosts = async (): Promise<Post[]> => {
        const scriptBusca = `
        SELECT cod_post, titulo, conteudo, likes, created_at, att_at
        FROM postagem
        `;

        const { rows } = await this.db.query<Post>(scriptBusca)
        return rows
    }

    public getPostById = async (id: string): Promise<Post> => {
        const scriptBusca = `
        SELECT cod_post, titulo, conteudo, likes, created_at, att_at
        FROM postagem
        WHERE cod_post = $1
        `;

        const { rows } = await this.db.query<Post>(scriptBusca, [id])

        if (rows.length === 0) {
            throw new NotFoundError('Post not found');
        }

        return rows[0]
    }

    public getCommentsByPost = async (id: string): Promise<Comentario[]> => {
        const scriptBusca = `
        SELECT comentario.cod_comentario, comentario.conteudo, comentario.cod_post FROM comentario
        INNER JOIN postagem
        ON postagem.cod_post = comentario.cod_post
        WHERE comentario.cod_post = $1
        `;

        const { rows } = await this.db.query<Comentario>(scriptBusca, [id])

        if (rows.length === 0) {
            throw new NotFoundError('Comments not found');
        }

        return rows
    }

    public updatePartialPost = async(post: Post): Promise<void> => {
        const scriptUpdate = `
        UPDATE postagem
        SET conteudo = $1, titulo = $2, likes = $3, att_At = $4
        WHERE cod_post = $5
        `

        await this.db.query(scriptUpdate, [post.conteudo, post.titulo, post.likes, post.att_at, post.cod_post])
    }

    public deletePostById = async (id: string): Promise<void> => {
        const scriptDelete = `
        DELETE FROM postagem
        WHERE cod_post = $1
        `

        await this.db.query(scriptDelete, [id])
    }
}


export default new PostRepository();