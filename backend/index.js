import express from 'express'

import cors from 'cors'
import router from './routers/routes.js'
import userRouter from './routers/user-router.js'
const app = express()
app.use(express.json())
app.use(cors())

app.use('/', router)
app.use('/auth', userRouter)

const port = 5566
app.listen(port, () => {
  console.log(`app is listening on port ${port}....`)
})
