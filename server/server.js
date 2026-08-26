import express from "express";
import cors from "cors";
import "dotenv/config"
import conectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/ resumeRoutes.js";


const app = express()
const PORT = process.env.PORT || 3000;

//data base connection
await conectDB()


app.use(express.json())
app.use(cors())
app.use('/api/users' , userRouter)
app.use('/api/resumes' , resumeRouter)

app.get('/', (req,res)=> res.send("server is live..."))

app.listen(PORT , ()=> {
    console.log(`server is running on the ${PORT}`)
})