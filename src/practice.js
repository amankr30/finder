const express = require("express");

const app = express();

//Error handling

app.use('/admin',(req,res,next)=>{
    try {
        throw new Error("12g4hj3g2j3h4g");
        res.send("get data of user1!!");
        
    } catch (error) {
        res.status(500).send("Error in admin route");
    }
})


//order matters - (err,req,res,next)
//Always put error handling middleware at the end of all routes
app.use('/',(err,req,res,next)=>{
    if(err){
        console.log(err.message);
        res.status(500).send("something went wrong, Please contact support team");
    }else{
        res.send("get data of user1!!");
    }

})


// const {adminAuth,adminAuthDelete}=require("./middlewares/auth");

//Handle middleware for all routes like GET,PUT,POST.... request
// app.use('/admin',adminAuth);

// app.use("/admin/getAllData", (req, res, next) => {
//   res.send("get data of user1!!");
// });
// ;


// app.use("/admin/getAllData",adminAuth, (req, res, next) => {
//   res.send("get data of user1!!");
// });

// app.use("/admin/deleteData", adminAuthDelete, (req, res, next) => {
//   res.send("delete data of user2!!");
// });



// app.use("/admin", (req, res, next) => {
//   console.log("user authentication is checked");
//   const token = "xyz123";
//   const authentication = token === "xyz123";
//   if (!authentication) {
//     return res.status(401).send("Unauthorized access");
//   } else {
//     next();
//   }
// });

// app.use("/admin/getAllData", (req, res, next) => {
//   res.send("get data of user1!!");
// });

// app.use("/admin/deleteData", (req, res, next) => {
//   res.send("delete data of user2!!");
// });


// app.use("/admin/getAllData", (req, res, next) => {
//   console.log("user authentication is checked");
//   const token = "xyz1235";
//   const authentication = token === "xyz123";
//   if (!authentication) {
//     return res.status(401).send("Unauthorized access");
//   } else {
//     res.send("get data of user1!!");
//   }
// });

// app.use("/admin/DeleteData", (req, res, next) => {
//   console.log("user authentication is checked");
//   const token = "xyz123";
//   const authentication = token === "xyz123";
//   if (!authentication) {
//     return res.status(401).send("Unauthorized access");
//   } else {
//     res.send("delete data of user2!!");
//   }
// });

// app.get('/user',(req,res,next)=>{
//     console.log("Middleware 1");
//     // res.send("get data of user1!!");
//     next();
// },
// (req,res,next)=>{
//     console.log("Middleware 2");
//     next();
//     // res.send("get data of user2!!");
// },
// (req,res,next)=>{
//     console.log("Middleware 3");
//     // next();
//     res.send("get data of user3!!");
// },
// )

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
