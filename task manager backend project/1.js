const express=require('express');
const res = require('express/lib/response');
const app=express();
const tasks=require('./routes/tasks')
const connectDB=require('./mongodb/connect')
const notFound=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/errorHandlerMiddleware')
require('dotenv').config();
// middleware
app.use(express.json())
// routes  

app.use(express.static('./public'))
app.use('/api/vi/tasks',tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port= process.env.PORT || 5000
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening on port ${port}...`))
    }
    catch(error){
        console.log(error)
    }
}
start()
