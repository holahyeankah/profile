'use strict';
const dotenv =require('dotenv');
dotenv.config()

const mysql =require("mysql2");

const pool=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

pool.connect((err)=>{
    if(err){
        console.log(err)
    }
})
module.exports=pool