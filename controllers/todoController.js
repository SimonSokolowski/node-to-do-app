var express = require("express");
var mongoose = require("mongoose");

//connect to database
mongoose.connect("mongodb+srv://todo:todo@cluster0.cy09m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

//create schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model("todo", todoSchema);

//var data = [{item: "get milk"}, {item: "walk dog"}, {item: "do some coding"}];
var urlencodedParser = express.urlencoded({extended: false});

module.exports = function(app){
    app.get("/todo", function(req, res){
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render("todo", {todos: data});
        });
    });

    app.post("/todo", urlencodedParser, function(req, res){
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.render("todo", {todos: data});
        });
    });

    app.delete("/todo/:item", function(req, res){
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.render("todo", {todos: data});
        });
    });
};