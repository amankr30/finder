const express= require('express');

const app=express();

app.get('/user',(req,res)=>{
    res.send("get data of user!!");
})

app.post('/user',(req,res)=>{
    //DB logic
    res.send("post data of user in the database!!");
});

app.delete('/user',(req,res)=>{
    res.send("delete data of user from the database!!");
})


app.use("/",(req,res)=>{
    res.send('Welcome Mr. Aman!');
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})