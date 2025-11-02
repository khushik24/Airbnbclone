const express=require("express");
const app=express();
const users = require("./routes/user.js");

app.get("/",(req,res)=>{
    res.send("Hi,I am root");
});

app.use("/users",users);

//index
app.get("/users",(req,res)=>{
    res.send("GET for users");
});

//show
app.get("users/:id",(req,res)=>{
    res.send("Get for user id");
})

//post
app.post("/users",(req,res)=>{
     res.send("POST for user ");
});

//delete
app.delete("/users/:id",(req,res)=>{
      res.send("delete for user id")
});

app.listen(3000,()=>{
    console.log("server is listening to 3000");
});