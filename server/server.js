import 'dotenv/config'
import express from'express'
import cors from'cors'
import connectDB from './configs/monogodb.js'

//App Config
const PORT = process.env.PORT || 4000
const app = express()
await connectDB()
//Intialize middlewear
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=> res.send("API working"))

app.listen(PORT,()=> console.log("server running on port"+ PORT))
