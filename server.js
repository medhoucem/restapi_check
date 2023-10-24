require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const user_model = require("./models/user");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.json())
const port = 3500;


mongoose
  .connect(process.env.DB_URL, {})
  .then(()=>{ console.log('db connected')
    startServer();
   
  })
  .catch((err) => {
    throw err;
  })
  .finally(() => {
    console.log("all done😎");
  });


function startServer() {
    app.listen(port, () => {
        console.log("server is listening at port 3500");
    });
}



app.post("/addUser",async (req,res)=>{
    const name = req.body.name
    let new_user = new user_model({
        name :name.toString(),
    });
    var resul =  await new_user.save()
    res.send(resul)
})


app.get("/users",async (req,res)=>{
  const users = await user_model.find();
  res.send(users);
})

app.put("/users/:id",async (req,res)=>{
  const users = await user_model.findById(req.params.id)
  users.name = req.params.name;
  var resul = await users.save();
  res.send(resul)

})

app.delete("/users/:id",async (req,res)=>{
   await user_model.findByIdAndDelete(req.params.id)
   res.send("users get deleted");
})