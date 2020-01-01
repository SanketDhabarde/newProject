var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host:'localhost',
    user: 'sank',
    password: 'password',
    database : 'join_us'
});

app.get("/", function(req, res){
    //find count of the users
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function(error, results){
        if(error) throw error;
        var count = results[0].count; 
        res.render("home", {count: count});
    });
});

app.post("/register", function(req, res){
     var person ={
         email: req.body.email
     };
     connection.query("INSERT INTO users SET ?", person, function(error, result){
         if(error) throw error;
         res.redirect("/");
     });
});



app.listen(1000, function(){
    console.log("server is running on 1000!");
});