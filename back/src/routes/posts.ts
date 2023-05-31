import { Router } from 'express'
import PostController from '../controller/PostController';

export const postsRoutes = Router()

postsRoutes.get('/posts', PostController.getAllPosts)
postsRoutes.get('/posts/:id', PostController.getPostById)
postsRoutes.get('/posts/:id/comments', PostController.getCommentsByPost)
postsRoutes.delete('/posts/:id', PostController.deletePostById)
postsRoutes.post('/posts', PostController.createPost)
postsRoutes.patch('/posts/:id', PostController.updatePartialPost)
postsRoutes.patch('/posts/:id/likes', PostController.updateLikeOfPost)