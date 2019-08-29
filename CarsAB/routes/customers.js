var express = require('express');
var router = express.Router();
var da = require('../data_access/da');

/* GET customers listing. */
router.get('/', function(req, res, next) {
  da.findPersons(function(err, customers) {
    res.render('customers/customers', {title:'Customer listing', customers_list: customers});
  });
});

router.post('/', function(req, res, next) {
  da.savePersonFromForm(req.body, function(err) {
    res.redirect('/customers');
  });
});

router.get('/add', function(req, res){
  var userid = req.session['userid'];
  res.render('customers/add', {title: 'Add User', userid: userid});
});

router.get('/delete', function(req, res){
  da.deleteUser(req.query.id, function(err){
    res.redirect('/customers');
  });
});

module.exports = router;
