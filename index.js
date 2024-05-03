var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000;

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//serving static files
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

//mongoose
const db_Url = process.env.DB_URL || "mongodb://localhost:27017/spa";
mongoose
  .connect(db_Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(function() {
    console.log("Connected to DB!")
  })
  .catch(function(err) {
    console.log("ERROR", err.message);
  });

var todoRoutes = require('./routes/todos');

app.get('/', function(req, res) {
  res.sendFile("index.html");
});

app.use('/api/todos', todoRoutes);

app.listen(port, function() {
  console.log("APP LISTENING ON PORT " + port);
});