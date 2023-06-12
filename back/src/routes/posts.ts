import { Router } from 'express'
import PostController from '../controller/PostController';
import { authMiddleware } from '../middleware/authMiddleware';

export const postsRoutes = Router()

postsRoutes.get('/posts', PostController.getAllPosts)
postsRoutes.get('/posts/:id', PostController.getPostById)
postsRoutes.get('/posts/:id/comments', PostController.getCommentsByPost)
postsRoutes.delete('/posts/:id', PostController.deletePostById)
postsRoutes.post('/posts', authMiddleware, PostController.createPost)
postsRoutes.patch('/posts/:id', authMiddleware, PostController.updatePartialPost)
postsRoutes.patch('/posts/:id/likes', authMiddleware, PostController.updateLikeOfPost)