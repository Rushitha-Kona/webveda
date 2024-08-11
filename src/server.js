import cors from 'cors';
import express from 'express';
import { connectToDB } from "./db.js";
import { db } from "./db.js";
const app = express()
app.use(cors())
app.use(express.json())



app.post('/signin', async(req, res) => {
    console.log(req.body)
    await db.collection("ast").findOne({Email:req.body.Email,password:req.body.Password})
    .then((result)=>{
        console.log(result)
        if(result?.Password===req.body.password){
            res.json({message:"login sucess", values:result})
        } else {
            res.json({error:"user not found"})
        }
    })
    .catch((e)=>console.log(e))
})




app.post('/signup', async (req, res) => {
    try {
      // Check if the email already exists
      const existingUser = await db.collection("ast").findOne({ Email: req.body.Email });
  
      if (existingUser) {
        return res.json({ message: "This email already exists" });
      }
  
      // Insert new user if email doesn't exist
      const user = await db.collection("ast").insertOne({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        PhoneNumber: req.body.PhoneNumber,
        Email: req.body.Email,
        password: req.body.password
      });
  
      res.json({ message: "User registered successfully" });
  
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Internal server error" });
    }
  });


// app.post('/signup', async(req, res) => {
//     console.log(req.body)
//     await db.collection("ast").insertOne({First_Name:req.body.FirstName,Last_Name:req.body.LastName,Phone:req.body.PhoneNumber,Email:req.body.Email,Password:req.body.password})
//     .then((result)=>{
//         console.log(result)
//         if(result){
//             res.json({message:"Signup sucess", values:result})
//         } else {
//             res.json({error:"Failed"})
//         }
//     })
//     .catch((e)=>console.log(e))
// })






app.post('/students', async(req, res) => {
    await db.collection("ast").find().toArray()
    .then((result)=>{
        res.send(result)
    })
    .catch((e)=>console.log(e))
})




connectToDB(() => {
    app.listen(9000, () => {
        console.log("server running at 9000");
 })
})




