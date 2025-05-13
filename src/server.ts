import dotenv from 'dotenv'
import app from './app'
import connectDB from './config/db'

// Load environment variables
dotenv.config()

// connect to mangoDB
connectDB()

const port = process.env.PORT || 3000

// start server
app.listen(port,()=>{
console.log (`server running on port${port}`)
})
