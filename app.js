var express = require("express");
var todoController = require("./controllers/todoController");
var app = express();

//set up template engine
app.set("view engine", "ejs");

//static files
app.use(express.static("./public"));

//fire controllers
todoController(app);

//Get website pages
app.get("/", function(req, res){
    res.render("home");
});

//listen to port
app.listen(3000);