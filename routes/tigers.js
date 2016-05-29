var express = require('express');
var router = express.Router();
var _ = require('lodash');

var tigers = [{
  name: "Tigger",
  age: 35,
  pride: "Winnie's Gang",
  gender: "male",
  id: '1'
},
{
  name: "Tigress",
  age: 10,
  pride: "Furious Five",
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
    res.render('tigers/index', {
      title: "Tigers!",
      tigers: tigers,
      layout: 'tigers/layout'
    });
  })
  .post(updateId(), function(req, res){
    var tiger = req.body;
    id++;
    tiger.id = id + '';
    tigers.push(tiger)
    res.render('tigers/index', {
      title: "Tigers!",
      tigers: tigers,
      layout: 'tigers/layout'
    });
  })

router.route('/new')
  .get(function(req, res){
    res.render('tigers/new', {
      title: 'Tigers!',
      layout: 'tigers/layout'
    });
  });

router.param('id', function(req, res, next, id) {
  var tiger = _.find(tigers, {id: id})
  if (tiger) {
    req.tiger = tiger;
    next();
  } else {
    res.send('There is no tiger with the id ' + id);
  }
});

router.route('/:id')
  .get(function(req, res){
    for (var i = 0; i < tigers.length; i++) {
      if (req.params.id == tigers[i].id) {
        res.send(tigers[i])
      }
    }
    res.send("There is no tiger with that id!");
  })
  .put(function(req, res){
    for (var i = 0; i < tigers.length; i++) {
      if (req.body.id === tigers[i].id) {
        tigers.splice(i, 1, req.body)
        res.end();
      }
    }
  })
  .delete(function(req, res){
    for (var i = 0; i < tigers.length; i++) {
      if (req.body.id === tigers[i].id) {
        tigers.splice(i, 1);
        res.end();
      }
    }
  });

router.route('/:id/edit')
  .get(function(req, res){
    console.log(req.tiger);
    res.render('tigers/edit', {
      title: 'Tigers!',
      name: req.tiger.name,
      age: req.tiger.age,
      gender: req.tiger.gender,
      pride: req.tiger.pride,
      id: req.tiger.id,
      layout: 'tigers/layout'
    });
  });

module.exports = router;
