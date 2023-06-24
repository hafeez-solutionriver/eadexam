const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/examdae?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1").then(()=>{
    console.log("connetion succesfulll");
}).catch((e)=>{
    console.log(e);
})


const Schema= new mongoose.Schema({
    name:String,
    description:String,
    ingrediants:String,
    thumbnail:String,
})

const Usermodel = mongoose.model("Recipe",Schema);

module.exports =Usermodel;


