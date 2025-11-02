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
      res.send("delete for user id");
});