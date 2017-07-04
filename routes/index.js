var express = require('express');
var router = express.Router();
var config = require('../bin/config');
var util = require('../bin/util');
var all = require('../dao/all');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});
router.get('/reg', function (req, res, next) {
  res.render('register');
});

// 获取所有list
router.route('/list').get(function (req, res) {
  res.render('list');
}).post(function (req, res) {
  all.user.find(function (e, result) {
      res.send(result)
  });
});

//注册验证
router.route('/loginChack').get(function (req, res) {
  // res.send(u.get404("regChack"));
}).post(function (req, res) {
  var email = req.body.email;
  var pwd = req.body.pwd;
  console.log(email, pwd);
  pwd = util.getCrypto(pwd);
  all.user.getLogin(email, pwd, function (e, result) {
    console.log(result)
    if (result) {
      console.log('登录成功');
      res.redirect("/");
    } else {
      console.log('登录失败');
      res.redirect("/");
    }
  });
});

//注册验证
router.route('/regChack').get(function (req, res) {
  // res.send(u.get404("regChack"));
}).post(function (req, res) {
  var email = req.body.email;
  var pwd = req.body.pwd;
  pwd = util.getCrypto(pwd);
  var newId = util.getRandomName();
  var user = {
    _id: newId,
    username: '',
    password: pwd,
    mailbox: email,
    regtime: util.getDateTime(),
    lastlogin: ''
  };
  all.user.saveUser(user, function (e, result) {
    if (e) {
      console.log(e);
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  });
});

//注册验证码
router.route('/regCode').get(function (req, res) {
  // res.send(u.get404("regCode"));
}).post(function (req, res) {
  var email = req.body.email;
  all.user.isMailbox(email, function (error, docs) {
    if (docs.length) {
      res.send("existence");
    } else {
      var code = util.getCode();
      req.session.code = code;
      req.session.email = email;
      util.sendEmail(email, code, res);
    }
  })
});

module.exports = router;
