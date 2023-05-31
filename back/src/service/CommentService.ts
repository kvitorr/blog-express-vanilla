import { Comentario } from "../entidades/Comentario"
import CommentRepository from "../repository/CommentRepository"

class CommentService {


    public getAllComments = async (): Promise<Comentario[]> => {
        return await CommentRepository.getAllComments()
    }

    public getCommentById = async (id: string): Promise<Comentario> => {
        return await CommentRepository.getCommentById(id)
    }

    public createComment = async (comentario: Comentario): Promise<void> => {
        return await CommentRepository.createComment(comentario)
    }

    public updateComment = async(comentario: Comentario): Promise<void> => {
        return await CommentRepository.updateComment(comentario)
    }

    public deleteCommentById = async (id: string): Promise<void> => {
        return await CommentRepository.deleteCommentById(id)
    }

}


export default new CommentService()