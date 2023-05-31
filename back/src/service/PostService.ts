import { Comentario } from "../entidades/Comentario"
import { Post } from "../entidades/Post"
import PostRepository from "../repository/PostRepository"
import { v4 as uuidv4 } from 'uuid';



class PostService {
    public createPost = async (titulo: string, conteudo: string): Promise<Post> => {
        const uuid: string = uuidv4()

        const newPost: Post = {
            "cod_post": uuid,
            "titulo": titulo,
            "conteudo": conteudo,
            "likes": 0,
            "created_at": new Date(),
            "att_at": null
        }

        return await PostRepository.createPost(newPost)
    }


    public getAllPosts = async (): Promise<Post[]> => {
        return await PostRepository.getAllPosts()
    }

    public getPostById = async (id: string): Promise<Post> => {
        return await PostRepository.getPostById(id)
    }

    public getCommentsByPost = async (id: string): Promise<Comentario[]> => {
        return await PostRepository.getCommentsByPost(id)
    }

    public updatePartialPost = async(post: Post): Promise<void> => {
        return await PostRepository.updatePartialPost(post)
    }

    public deletePostById = async (id: string): Promise<void> => {
        return await PostRepository.deletePostById(id)
    }
}


export default new PostService()