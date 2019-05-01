var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: String,
    email: String,
    age: Number,
    date: {
      default: Date.now,
      type: Date,
    }
  }
);
var UserModel = mongoose.model('sheets', UserSchema);

/* GET home page. */
router.get('/', function(req, res,next){
  UserModel.find({}, function(err, docs) {
    res.render('index', { 'dbList': docs });
  });
});

router.get('/delete', function(req, res,next){
  UserModel.deleteOne({'_id':req.query.id}, function(err, docs) {
    res.redirect('/');
  });
});

router.post('/update', function(req, res,next){
  UserModel.updateOne({ '_id': req.query.id }, { $set: req.body }, { upsert: false, multi: true }, function(err) {
    res.redirect('/');
  });
});

router.post('/insert', function(req, res, next) {
  var user = new UserModel();
  user.name = req.body.name;
  user.age = req.body.age;
  user.email = req.body.email;
  user.save(function(err) {
    res.redirect('/');
  })
});


module.exports = router;
