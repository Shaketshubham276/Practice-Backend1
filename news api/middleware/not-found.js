const notFound=(req,res)=>{
    res.status(404).send("Routs does not exist")
}
module.exports=notFound