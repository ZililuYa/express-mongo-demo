var dbo = require('../bin/mongoose').mongoose;
var u = require('../bin/Util');

//用户表
var User = dbo.model('user', dbo.Schema({
    _id: String,
    username: String,
    password: String,
    mailbox: String,
    regtime: String,
    lastlogin: String
}));


//登录验证
exports.getLogin = function (email, pwd, callback) {
    User.findOne({mailbox: email, password: pwd}, callback);
};

// 查询所有
exports.find = function (callback) {
  User.find({}, callback);
};

//更新最后一次登录时间
exports.setLastLogin = function (id) {
    User.update({_id: id}, {lastlogin: u.getDateTime()}, function (err) {
        if (err)
            console.err(err);
    });
};

//保存一个用户
exports.saveUser = function (u, callback) {
    var user = new User(u);
    user.save(callback);
};

exports.isMailbox = function (e, callback) {
    User.find({mailbox: e}, callback);
};


//修改密码
exports.updatePwd = function (e, p, callback) {
    User.update({mailbox: e}, {password: p}, callback);
};

//获取用户
exports.getById = function (id, callback) {
    User.findOne({_id: id}, callback);
};


//修改昵称
exports.updateName= function (id, n, callback) {
    User.update({_id: id}, {username: n}, callback);
};