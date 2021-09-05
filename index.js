const express= require('express')
const path = require ('path')
const bodyParser = require('body-parser')
const cors = require('cors');
const pool = require('./src/config/db') 



const app= express();


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get("/api/get", (req, res)=>{
    pool.query("SELECT * FROM data", (err, result)=>{
        if(err){
            console.log(err.message);
        }
        else{
            if(result){
                res.send({
                    message: "Data gotten successfully",
                    success:result
                })
            }
        }
    })
})


app.post("/api/post", (req, res)=>{
    const{description}=req.body;
    pool.query("INSERT INTO data (description) VALUES (?)",
    [description], (err, result)=>{
        if(err){
            console.log(err);
        }
        if(result){
        res.send({
            message:"Added successfully",
            success:result
        })
    }
    }
    );
})
app.delete("/delete/:id", (req, res)=>{
    const id=req.params.id
    pool.query("DELETE FROM data WHERE id=?", id, (err, result)=>{
        if(err){
            console.log(err)
        }
        else{
            if(result){
                res.send({
                    code:200,
                    message:"Deleted successfully",
                    success:result
                })
            }
        }
       
    })
})






const PORT= process.env.PORT || '3001'
app.listen(PORT,()=>{
console.log(`Server is listening on port ${PORT}`)

})
module.exports=app;

