var express = require("express");
var mongoose = require("mongoose");

//connect to database
mongoose.connect("mongodb+srv://todo:todo@cluster0.cy09m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

//create schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model("todo", todoSchema);

var itemOne = Todo({item: "get flowers"}).save(function(err){
    if (err) throw err;
    console.log("item saved");
});

var data = [{item: "get milk"}, {item: "walk dog"}, {item: "do some coding"}];
var urlencodedParser = express.urlencoded({extended: false});

module.exports = function(app){
    app.get("/todo", function(req, res){
        res.render("todo", {todos: data});
    });

    app.post("/todo", urlencodedParser, function(req, res){
        data.push(req.body);
        res.render("todo", {todos: data});
    });

    app.delete("/todo/:item", function(req, res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, "-") !== req.params.item;
        });
        res.render("todo", {todos: data});
    });
};