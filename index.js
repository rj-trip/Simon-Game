const express=require("express");
const app= express();

const mongoose= require("mongoose");
const path = require("path");
const chat = require("./models/chats.js");
const methodOverride = require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));//parsing input data
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("successfully connect");
})
.catch((err)=>{
   console.log(err);
});

 async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsApp");
 }

//  let chat1= new chat({
//     from: "Neha",
//     to:"Priya",
//     msg:"Send me your exam papers",
//     created_at: new Date()
//  });

//  chat1.save().then((res)=>{console.log(res)})
//  .catch((err)=>{console.log(err)});

app.get("/chats",async(req,res)=>{
 //  let chats= await chat.find();
   console.log("hiii i m main");
//    res.send("working");
   res.render("main.ejs");
});
///important--------------------------------------------
// app.get("/chats",async(req,res)=>{
//    let chats= await chat.find();
//    console.log(chats);
// //    res.send("working");
//    res.render("index.ejs",{chats});
// });
//----------------------------------------------------
app.get("/chats/mainpage",async(req,res)=>{
   let chats= await chat.find();
   console.log(chats);
//    res.send("working");
   res.render("index.ejs",{chats});
});


//new rout create
app.get("/chats/mainpage/new", (req,res)=>{
   console.log("hii");
   res.render("new.ejs");
});

//create route
app.post("/chats/mainpage", (req,res)=>{
   let {from,to,msg} = req.body;
   let newChat=new chat({
      from: from,
      to:to,
      msg: msg,
      created_at: new Date()
   });
    console.log(newChat);
    newChat
    .save() 
    .then((res) =>{
      console.log("chat was saved");
    })
    .catch((err)=>{console.log(err);});
  //  res.send("Working");
  res.redirect("/chats/mainpage");
});

//Edit routes
app.get("/chats/mainpage/:id/edit", async(req,res)=>{
  console.log("hii");
   let {id}= req.params;
   let Chat = await chat.findById(id);
   res.render("edit.ejs",{Chat});
});

//UPDATE Route
app.put("/chats/mainpage/:id",async(req,res)=>{
   let {id} =req.params;
   let {msg: newMsg} =req.body;
console.log(newMsg);
   let updatedChat =await chat.findByIdAndUpdate(id,
       {msg: newMsg},
      {runValidators: true, new:true});
   console.log(updatedChat);
   res.redirect("/chats/mainpage");
});

//Destroy Route
app.delete("/chats/mainpage/:id",async (req,res)=>{
   let {id}=req.params;
   let deletedChat=await chat.findByIdAndDelete(id);
   console.log(deletedChat);
   res.redirect("/chats/mainpage");
})
app.get("/",(req,res)=>{
    res.send("root is working");
});
app.listen(8080,()=>{
    console.log("server is listening on port 8080");
});