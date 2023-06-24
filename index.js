const express =require("express")
const app =express();
const Recipe = require("./RecipeDatabase");



app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}))

app.get("/",async(req,res)=>{
    const recipes = await Recipe.find({});
    res.render("Home",{
    
        recipes:recipes
    })
  
})

app.post("/register",async(req,res)=>{
    const {name,description,ingrediants,thumbnail}=req.body;
    const newuser = new Recipe({name,description,ingrediants,thumbnail});
    const usersave = await newuser.save();
    res.redirect("/");
})

app.get("/register",(req,res)=>{
    res.render("Register");
})

app.get("/edit/:id",async(req,res)=>{
    const {id} =req.params;
    const recipe = await Recipe.findById({_id:id});
    if(recipe==null){
        res.redirect("/");
    }else{
        res.render("edit",{
            recipe:recipe
        })
    }
})

app.post("/update/:id",async(req,res)=>{
    const {id} =req.params;
    const {name,description,ingrediants,thumbnail}=req.body;
    const updateuser = await Recipe.findByIdAndUpdate({_id:id},
        {name,description,ingrediants,thumbnail},
        {new:true})
    res.redirect("/");
})

app.get("/delete/:id",async(req,res)=>{
    const {id} =req.params;
const deleteuser =await Recipe.findByIdAndDelete({_id:id});
res.redirect("/");
})

app.listen(5000,()=>{
    console.log("Server is listening on port 5000...");
})