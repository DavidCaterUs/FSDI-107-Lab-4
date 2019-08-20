

var http = require('http');

var express = require('express')

var app = express();//create an express app
/****************************************/

app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();

});

//read req body as object
 var bparser = require("body-parser");
 app.use(bparser.json());

//to serve HTML,CSS,JS from the server

app.use(express.static(__dirname + '/views'));

var ejs = require('ejs');
app.set('views', __dirname + '/FSDI 107 Node JS lab 2'); // where are the HTML files ?
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

//mongo& moongoose

var mongoose = require('mongoose');
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',);

var db = mongoose.connection;
//DB object constructor
var ItemDB;

console.log(__dirname + '/views');
 // Storage options

 var items = [];
 var nextId = 0;

//Web Server Functionality
app.get('/', (req, res) => {
  res.render('index.html');
});


app.get('/admin', (req, res) => {
  res.render('admin.html');
});

app.get('/contact', (req, res) => {

});

app.get('/about', (req, res) => {
  res.render('/about.html');
});

app.get('/api/products', (req, res) => {
  ItemDB.find({}, function (error, data){
    if (error){
      console.log("Error reading data", error);
      res.status(500);
      res.send(error);

    }
    res.json(data);
    });

});

app.get("/api/products/:user", (req, res) => {

  ItemDB.find({ user: req.params.user }, function (error, data){
    if (error){
      console.log("Error reading data", error);
      res.status(500);
      res.send(error);

    }
    res.json(data);
    });



});

app.post('/api/products', (req, res) =>{
// read from mongoose and bring it back.



    var item= new ItemDB(req.body);


// save the object onto DB
    item.save(function(error, savedItem){
        if(error){
          console.log("Error, item was not saved on Mongo", error);
          res.status(500);
          res.send(error);

        }

        console.log("item saved correctly");
        //send back as a json
            res.status = 201;
            res.json(savedItem);

    });

});

app.get('/homework2', (req,res) => {



});

//listen to

db.on('error', function (error) {
  console.log("Error connection to Mongo server", error);

});

db.on('open', function (){
  console.log("Yeiii DB it's ALIVE!");

  // The allowed SchemaTypes : String , Number, Date , Buffer, Boolean, Mixed

    var itemsSchema = mongoose.Schema({
      title: String,
      description : String,
      price : Number,
      image: String,
      category: String,
      user: String
    });

    ItemDB = mongoose.model("itemsCh4", itemsSchema)

});

  app.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});
