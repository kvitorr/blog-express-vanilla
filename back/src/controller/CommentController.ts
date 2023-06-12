import { Request, Response, NextFunction } from "express";
import { Comentario } from "../entidades/Comentario";
import CommentService from "../service/CommentService";
import { v4 as uuidv4 } from 'uuid';

class CommentController {

    public getAllComments = async (request: Request, response: Response, next: NextFunction) => {
        const comments: Comentario[] = await CommentService.getAllComments()

        response.status(200).json(comments)
    }

    public getCommentById = async (request: Request, response: Response, next: NextFunction) => {
        const commentId: string = request.params.id
        const comment: Comentario = await CommentService.getCommentById(commentId)
    
        response.status(200).json(comment)
    }

    public deleteCommentById = async (request: Request, response: Response, next: NextFunction) => {
        const commentId = request.params.id
        await CommentService.deleteCommentById(commentId)

        response.status(204).send()
    }

    public createComment = async (request: Request, response: Response) => {
        const { conteudo, cod_post, cod_usuario } = request.body
        const uuid: string = uuidv4()
        const newComment: Comentario = {
            "cod_comentario": uuid,
            "conteudo": conteudo,
            "cod_post": cod_post,
            "created_at": new Date(),
            "cod_usuario": cod_usuario
        }
    
        await CommentService.createComment(newComment)
        response.status(201).json(newComment)
    }

    public updateCommentContent = async (request: Request, response: Response) => {
        const commentId = request.params.id
        const commentFound: Comentario = await CommentService.getCommentById(commentId)
    
        const { conteudo } = request.body;
            
        commentFound.conteudo = conteudo ?? commentFound.conteudo
    
        await CommentService.updateComment(commentFound)
        response.status(200).send()
    }


}

export default new CommentController()