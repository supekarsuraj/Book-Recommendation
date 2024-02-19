const express=require("express")
const bodyParser = require("body-parser");
const routes= require('./routes/index')
const mongoose = require('mongoose');

require('dotenv').config();
const app=express();
// const routes=require("./routes/index")
const cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
mongoose.connect('mongodb://127.0.0.1:27017/Books', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


app.use((req, res, next) => {
    console.log("I am Here :-)")
    next()
})
app.get("/",(req,res)=>{
    res.send("Welcome to my home page");
})
// app.use('/api',routes);
app.use('/api',routes);

app.get("*",(req,res)=>{
    res.status(400).send({message:"page not found"});
})
const port = process.env.PORT;
app.listen(port || 8081,()=>{
    console.log(`Application running on port: ${port}`)
})