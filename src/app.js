const express= require('express');

const app=express();

app.get('/user',(req,res,next)=>{
    console.log("Middleware 1");
    // res.send("get data of user1!!");
    next();
},
(req,res,next)=>{
    console.log("Middleware 2");
    next();
    res.send("get data of user2!!");
},
(req,res,next)=>{
    console.log("Middleware 3");
    // next();
    res.send("get data of user3!!");
},
)



// app.post('/user',(req,res)=>{
//     //DB logic
//     res.send("post data of user in the database!!");
// });

// app.delete('/user',(req,res)=>{
//     res.send("delete data of user from the database!!");
// })


// app.use("/",(req,res)=>{
//     res.send('Welcome Mr. Aman!');
// })

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})