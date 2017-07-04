var nodemailer = require("nodemailer");
var crypto = require('crypto');
var fs = require('fs');

//创建邮箱
// var smtpTransport = nodemailer.createTransport("SMTP", {
//     host: "smtp.163.com", // 主机
//     secureConnection: true, // 使用 SSL
//     port: 465, // SMTP 端口
//     auth: {
//         user: "lukangdaye@163.com", // 账号
//         pass: "1029131145lk" // 密码
//     }
// });
var smtpTransport = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: 'lukangdaye@163.com',
    pass: '1029131145lk'
  }
});
//fbcmomkbhrcvbbee

//发送邮件
function sendEmail(e, c, res) {
  var mailOptions = {
    from: 'Fred Foo <lukangdaye@163.com> ',
    to: e,
    subject: '来自未知星球的验证码',
    html: '<b>验证码：' + c + '</b>'
  };
  smtpTransport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      res.send("success");
    }
  });
}


//传入一个值，返回MD5
function getCrypto(val) {
  var text = val;
  var hasher = crypto.createHash("md5");
  hasher.update(text);
  var hashmsg = hasher.digest('hex');
  return hashmsg;
}


//获取一个随机名字
function getRandomName() {

  var dateName = new Date().getTime();
  var numOutput = new Number(Math.random() * 100000).toFixed(0);
  dateName = dateName + "-" + numOutput;
  return dateName;
}

//获取一个验证码
function getCode() {
  var numOutput = (Math.random() * 899999).toFixed(0);
  numOutput = parseInt(numOutput) + 100000;
  return numOutput.toString();
}

//获取图片后缀，如果非图片则返回 false
function getImage(type) {
  var i = type.indexOf("image/");
  var ret = i < 0 ? false : type.replace("image/", ".");
  return ret;
}

//返回大小的判断
function getSize(size, sizeMax) {
  var Max = sizeMax * 1024 * 1024;
  return size > Max;
}

//获取当前时间 xxxx-xx-xx xx:xx:xx
function getDateTime() {
  var date = new Date();
  var YYYY = date.getFullYear();
  var MM = date.getMonth() + 1;
  var DD = date.getDate();

  var HH = date.getHours();
  var mm = date.getMinutes();
  var ss = date.getSeconds();

  MM = P10(MM);
  DD = P10(DD);
  HH = P10(HH);
  mm = P10(mm);
  ss = P10(ss);

  return YYYY + "-" + MM + "-" + DD + " " + HH + ":" + mm + ":" + ss;
}

function P10(v) {
  return v < 10 ? "0" + v : v;
}


//通用的分页类
function globalPage(current, num) {
  //当前页
  this.current = current;
  //每页行数
  this.num = num;
  //上一页
  this.prevPage = 0;
  //下一页
  this.nextPage = 0;
  //总数据
  this.totalData = 0;
  //总页数
  this.totalPage = 0;
  //数据
  this.objAll = null;

  this.bs = false;
  this.a = 1;
  this.b = 0;

  this.set = function () {
    this.totalPage = Math.ceil(this.totalData / this.num);
    this.current > this.totalPage ? this.current = this.totalPage : this.current < 1 ? this.current = 1 : !0;
    this.current <= 1 ? this.prevPage = 1 : this.prevPage = this.current - 1;
    this.current >= this.totalPage ? this.nextPage = this.totalPage : this.nextPage = this.current - 1 + 2;

    if (this.totalPage > 7) {
      if (this.current > 4) {
        this.a = this.current - 3;
      }
      if (this.a + 6 >= this.totalPage) {
        this.b = this.totalPage;
      } else {
        this.b = this.a + 6;
        this.bs = true;
      }
    } else {
      this.b = this.totalPage;
    }

  };
  this.getNum = function () {
    return this.num * (this.current - 1);
  };

}


function get404(a) {
  return "Do not directly access /" + a + " - 404";
}


function getIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

//判断用户是否登录
function isUser(req, ifs) {
  if (req.session.nowUser) {
    return true;
  } else {
    if (!ifs) {
      var u = req.baseUrl + req.url;
      req.session.nowUrl = u;
    }
    return false;
  }
}


//初始
function init(req, res) {
  res.locals.prompt = undefined;
  res.locals.title = undefined;
  res.locals.nowUser = req.session.nowUser;
}


function setFile(name) {
  var commonDirPath = '../public/upload/' + name;
  if (!fs.existsSync(commonDirPath)) {
    fs.mkdirSync(commonDirPath);
  }
}


exports.globalPage = globalPage;
exports.getRandomName = getRandomName;
exports.getImage = getImage;
exports.getSize = getSize;
exports.getDateTime = getDateTime;
exports.sendEmail = sendEmail;
exports.getCrypto = getCrypto;
exports.get404 = get404;
exports.getCode = getCode;
exports.getIp = getIp;
exports.isUser = isUser;
exports.init = init;
exports.setFile = setFile;