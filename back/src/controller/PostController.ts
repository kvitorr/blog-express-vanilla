import { Comentario } from "../entidades/Comentario"
import { Post } from "../entidades/Post"
import { Request, Response, NextFunction } from 'express'
import PostService from "../service/PostService"



class PostController {

    public createPost = async (request: Request , response: Response, next: NextFunction) => {
        const { titulo, conteudo } = request.body
        const newPost: Post = await PostService.createPost(titulo, conteudo)

        response.status(201).json(newPost)
    }


    public getAllPosts = async (request: Request , response: Response, next: NextFunction) => {
        const allPosts: Post[] = await PostService.getAllPosts()
        response.status(200).json(allPosts)
    }

    public getPostById = async (request: Request , response: Response, next: NextFunction) => {
        const postId: string = request.params.id
        const post: Post = await PostService.getPostById(postId)

        response.status(200).json(post)
    }

    public getCommentsByPost = async (request: Request , response: Response, next: NextFunction)  => {
        const postId: string = request.params.id
        const offset = request.query.offset
        const limit = request.query.limit 


        const comments: Comentario[] = await PostService.getCommentsByPost(postId)
        response.status(200).json(comments)
    }

    public updatePartialPost = async(request: Request , response: Response, next: NextFunction)  => {
        const postId = request.params.id
        const postFound: Post = await PostService.getPostById(postId);
        
        const { conteudo, titulo } = request.body;
        
        postFound.conteudo = conteudo ?? postFound.conteudo
        postFound.titulo = titulo ?? postFound.titulo
        postFound.att_at = new Date()

        await PostService.updatePartialPost(postFound)
        response.status(200).send()
    }

    public updateLikeOfPost = async (request: Request, response: Response) => {
        const postId = request.params.id
        const postFound: Post = await PostService.getPostById(postId)
            
        postFound.likes += 1
    
        await PostService.updatePartialPost(postFound)

        response.status(200).json(postFound.likes)
    }

    public deletePostById = async (request: Request , response: Response, next: NextFunction) => {
        const postId = request.params.id
        await PostService.deletePostById(postId)

        response.status(204).send()
    }
}


export default new PostController()