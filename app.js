import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.render("home.ejs")
})
app.get("/login", (req, res)=>{
    res.render("login")
})
app.get("/register", (req, res)=>{
    res.render("register")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });