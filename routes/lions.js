var express = require('express');
var router = express.Router();
var _ = require('lodash');

var lions = [{
  name: "Simba",
  age: 3,
  pride: "cool cats",
  gender: "male",
  id: '1'
},
{
  name: "Nalah",
  age: 2,
  pride: "cool cats",
  gender: "female",
  id: '2',
}
];

var id = 2;

var updateId = function() {
  return function(req, res, next) {
    if (!req.body.id) {
      id++;
      req.body.id = id + '';
    }
    next();
  }
};

router.route('/')
  .get(function(req, res){
    res.render('index', {
      title: "Lions!",
      lions: lions,
      layout: 'layout'
    });
  })
  .post(updateId(), function(req, res){
    var lion = req.body;
    id++;
    lion.id = id + '';
    lions.push(lion)
    res.render('index', {
      title: "Lions!",
      lions: lions,
      layout: 'layout'
    });
  })

router.route('/new')
  .get(function(req, res){
    res.render('new', {
      title: 'Lions!',
      layout: 'layout'
    });
  });

router.param('id', function(req, res, next, id) {
  var lion = _.find(lions, {id: id})
  if (lion) {
    req.lion = lion;
    next();
  } else {
    res.send('There is no lion with the id ' + id);
  }
});

router.route('/:id')
  .get(function(req, res){
    for (var i = 0; i < lions.length; i++) {
      if (req.params.id == lions[i].id) {
        res.send(lions[i])
      }
    }
    res.send("There is no lion with that id!");
  })
  .put(function(req, res){
    for (var i = 0; i < lions.length; i++) {
      if (req.body.id === lions[i].id) {
        lions.splice(i, 1, req.body)
        res.end();
      }
    }
  })
  .delete(function(req, res){
    console.log('deleting!', req.body.id);
    for (var i = 0; i < lions.length; i++) {
      if (req.body.id === lions[i].id) {
        lions.splice(i, 1);
        res.end();
      }
    }
  });

router.route('/:id/edit')
  .get(function(req, res){
    console.log(req.lion);
    res.render('edit', {
      title: 'Lions!',
      name: req.lion.name,
      age: req.lion.age,
      gender: req.lion.gender,
      pride: req.lion.pride,
      id: req.lion.id,
      layout: 'layout'
    });
  });

module.exports = router;
