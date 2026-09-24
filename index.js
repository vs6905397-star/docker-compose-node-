       import express, { json } from "express"
import mongoose from "mongoose";

const app = express();

app.use(express.json());

const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model("User", userSchema);

app.get("/", (req,res)=>{
   res.send("v1.1 docker image ")
});

app.post("/users",  async (req, res)=>{
    const user = await User.create({
        name: req.body.name,
        email: req.body.email
    });

    res.status(200),json(user);
})

app.get("/users", async(req, res)=>{
    const user = await User.find();
     res.json(user);
});

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("mongodb connected");
    })
    .catch((err)=>{
        console.log("mongodb connection failed:", err.message);
    });

app.listen(5000, ()=>{
    console.log("server running on port 5000");
});


