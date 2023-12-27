import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs"
import mongoose, { Schema } from 'mongoose'

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

//connect with mongodb default port
mongoose.connect("mongodb://127.0.0.1:27017/userDB", {useNewUrlParser: true});

//create user schema
const userSchema = new Schema({
    email: String,
    password: String
}) 

//create model for the userSchema 
const User = new mongoose.model("User", userSchema)

//get to homePage 
app.get("/", (req, res)=>{
    res.render("home.ejs")
})

//get to the loginPage
app.get("/login", (req, res)=>{
    res.render("login")
})

//get to the registerPage
app.get("/register", (req, res)=>{
    res.render("register")
})

//create new user account
app.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            email: req.body.username,
            password: req.body.password
        });
        await newUser.save(); 
        console.log(newUser); 
        res.render("secrets");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error registering user");
    }
});


// Login the user with their created account
app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    try {
        const foundUser = await User.findOne({ email: username });

        if (foundUser) {
            if (foundUser.password === password) {
                res.render("secrets");
            } else {
                res.send("Invalid password");
            }
        } else {
            res.send("User not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error logging in");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });