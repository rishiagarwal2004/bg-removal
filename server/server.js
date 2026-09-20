import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import connectDB from './configs/monogodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('API working')
})

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

await connectDB()

export default app