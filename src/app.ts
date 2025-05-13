import express, { Express } from "express";
import cors from 'cors'
import userRoutes from  './routes/user.routes'
import taskroutes from'./routes/task.routes'
// Initialize Express app
const app: Express = express()

// MiddleWare
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/users',userRoutes)
app.use('/api/tasks',taskroutes)
// Root route
app.get('/',(req,res)=>{
    res.send(`
        AOI is running...
        status:online
        Uptime:${Math.floor(process.uptime())}seconds
        Build with Express + Typescript + MangoDB
        `)  
})
app.get('/status',(req,res)=>{
    res.send(`
    
        status:online
        Uptime:${Math.floor(process.uptime())}seconds
        `)

        
})
export default app
