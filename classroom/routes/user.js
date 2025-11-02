const express=require("express");
const router = express.Router();

//index
router.get("/",(req,res)=>{
    res.send("GET for users");
});

//show
router.get("/:id",(req,res)=>{
    res.send("Get for user id");
})

//post
router.post("/",(req,res)=>{
     res.send("POST for user ");
});

//delete
router.delete("/:id",(req,res)=>{
      res.send("delete for user id");
});

module.exports = router;