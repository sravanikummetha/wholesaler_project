const express = require("express")
const mongoose = require("mongoose")
const app = express()


const DB = "mongodb+srv://admin:8mwyl6WVykCfBcqu@test.zp0ep.mongodb.net/test"
mongoose.connect(DB).then(()=>{
    console.log("Connected to Db successfully")
})
.catch((error)=>{console.log("error", error)})

app.listen(5000, ()=>{
    console.log("app is running")
})