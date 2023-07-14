import express from 'express'

import cors from 'cors'
import router from './routers/routes'
const app = express()
app.use(express.json())
app.use(cors())

app.use('/', router)

const port = 5566
app.listen(port, () => {
  console.log(`app is listening on port ${port}....`)
})
