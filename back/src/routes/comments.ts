import { Request, Response, Router } from 'express'
import CommentController from '../controller/CommentController';

export const commentsRoutes = Router()

commentsRoutes.get('/comments', CommentController.getAllComments)
commentsRoutes.get('/comments/:id', CommentController.getCommentById)
commentsRoutes.delete('/comments/:id', CommentController.deleteCommentById)
commentsRoutes.post('/comments', CommentController.createComment)
commentsRoutes.patch('/comments/:id', CommentController.updateCommentContent)


