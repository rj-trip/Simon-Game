const mongoose=require("mongoose");
const chat = require("./models/chats.js")

main().then(()=>{
    console.log("successfully connect");
})
.catch((err)=>{
   console.log(err);
});

 async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsApp");
 }
let allChats=[
    {
        from:"Priya",
        to:"Neha",
        msg:"send me",
        created_at:new Date()
    },
    {
        from:"Riya",
        to:"Shreya",
        msg:"teach me",
        created_at:new Date(),
    },
    {
        from:"Prince",
        to:"Nisha",
        msg:"bring me fruits",
        created_at:new Date()
    },
    {
        from:"Rita",
        to:"Shreyansh",
        msg:"play chess with me",
        created_at:new Date(),
    }
]
 chat.insertMany(allChats);