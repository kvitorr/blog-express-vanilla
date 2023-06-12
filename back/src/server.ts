import express from 'express'
import 'express-async-errors';
import 'dotenv/config'

import { errorMiddleware } from './middleware/ErrorMiddleware';
import { postsRoutes } from './routes/posts';
import { commentsRoutes } from './routes/comments';
import cors from 'cors'
import { loginRoutes } from './routes/login';
import { usuarioRoutes } from './routes/usuario';
const app = express()

app.use(express.json());
app.use(cors())
app.use(postsRoutes)
app.use(commentsRoutes)
app.use(loginRoutes)
app.use(usuarioRoutes)

app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})
