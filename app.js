var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var logger = require('morgan');
var _ = require('lodash');

app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')

var lions = [{
  name: "Simba",
  id: 1,
  age: 3,
  pride: "cool cats",
  gender: "male"
},
{
  name: "Nalah",
  id: 2,
  age: 2,
  pride: "cool cats",
  gender: "female"
}
];

var id = 2;

var findByName = function(array, id){
  for (var i = 0; i < array.length; i++) {
    if (id == lions[i].name) {
      return array[i];
    }
  }
}

app.get('/lions', function(req, res){
  res.send(lions);
})

app.get('/lions/new', function(req, res){
  res.render('index', {title: 'Lions!'});
})

app.get('/lions/:id', function(req, res){
  for (var i = 0; i < lions.length; i++) {
    if (req.params.id == lions[i].id) {
      res.send(lions[i])
    }
  }
  res.send("There is no lion with that id!");
})

app.post('/lions', function(req, res){
  var lion = req.body;
  id++;
  lion.id = id + '';
  lions.push(lion)
  res.send(lions);
})

app.put('/lions', function(req, res){
  var originalLion = findByName(lions, req.body.name);
  var updatedLion = req.body

  for (var i = 0; i < lions.length; i++) {
    if (originalLion.name === lions[i].name) {
      lions.splice(i, 1, updatedLion);
      console.log(lions);
      res.send(lions);
    }
  }
})

// app.patch('/lions', function(req, res){
// // I'm basically doing a patch with a PUT. Although I'm replacing the entire resource, I'm only allowing the user to update parts of an existing lion.
// })

app.delete('/lions', function(req, res){
  var originalLion = findByName(lions, req.body.name);

  for (var i = 0; i < lions.length; i++) {
    if (originalLion.name === lions[i].name) {
      lions.splice(i, 1);
      console.log(lions);
      res.send(lions);
    }
  }
})

app.listen(3000, function(){
  console.log("Listening on Port 3000");
});
