const express= require('express');

const app=express();

app.use("/hello",(req,res)=>{
    console.log('Hello World');
    res.send('Hello World');
})
app.use("/bye",(req,res)=>{
    console.log('Bye Darling!!');
    res.send('Bye Darling!!');
})
app.use("/",(req,res)=>{
    res.send('Welcome Mr. Aman!');
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})