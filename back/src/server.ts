import express from 'express'
import 'express-async-errors';

import { errorMiddleware } from './middleware/ErrorMiddleware';
import { postsRoutes } from './routes/posts';
import { commentsRoutes } from './routes/comments';
import cors from 'cors'
const app = express()
const port = 3000

app.use(express.json());
app.use(cors())
app.use(postsRoutes)
app.use(commentsRoutes)

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
