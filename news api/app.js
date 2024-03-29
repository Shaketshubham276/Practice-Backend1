require('dotenv').config()
require('express-async-errors')
// async errors

const express=require('express')
const app=express();

const connectDB=require('./db/connect')
const notFoundMiddleware=require('./middleware/not-found')
const errorMiddleware=require('./middleware/errorhandler')
const productRouter=require('./routes/products')


// middleware
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('<h1>STORE API</h1><a href="/api/v1/products">products route</a>')
})
app.use('/api/v1/products',productRouter)


// products route
app.use(notFoundMiddleware)
app.use(errorMiddleware)
const port= 5000

const start=async()=>{
    try {
        // connect DB
        await connectDB(process.env.MONGO_URI)
        
        app.listen(port,console.log(`Server is listening poRt ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()