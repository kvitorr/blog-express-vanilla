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
        ORDER BY created_at DESC
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

    public getCommentsByPost = async (id: string, limit: number, offset:number): Promise<Comentario[]> => {
        const scriptBusca = `
        SELECT * FROM comentario
        WHERE cod_post = $1
        ORDER BY created_at DESC
        LIMIT $2
        OFFSET $3
        `

        const { rows } = await this.db.query<Comentario>(scriptBusca, [id, limit, offset])

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

    public countCommentsById = async (postId:string): Promise<number> => {
        const scriptCountCommentsById = `
        SELECT COUNT(*) FROM COMENTARIO
        WHERE COD_POST = $1
        `

        const response = await this.db.query(scriptCountCommentsById, [postId])

        return Number(response.rows[0].count)
    }
}


export default new PostRepository();