var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/CorsoEF');

var User = mongoose.Schema({
    username: String,
    password: String
});

var User = mongoose.model("Users", User, "Users");

app.post('/api/login', function(req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });
    console.log(user);
    mongoose.connection.collection("Users").find({
        username: user.username,
        password: user.password
    }).count( (err, count) => {
        if(count==1)
            res.json({messaggio: "Login Effettuato"});
        else
            res.json({messaggio: "Username o Password errati"});
    });
    
});


app.post('/api/signup', function(req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });
    console.log(user);
    mongoose.connection.collection("Users").insertOne(user);
    res.json({messaggio: "OK"})
    
});

app.listen(8080);
console.log("Server Login lanciato con successo!");