var user = 'lukang';
var pass = 'lukang';
var cIp = '101.201.221.215';

var Config = {
    //数据库链接
    // dbUrl: 'mongodb://' + user + ':' + pass + '@' + cIp + '/zhuke',
    dbUrl:'mongodb://127.0.0.1:27017/htai',
    //端口
    port: '30',
    //注册码
    RegistrationCode: 'lchsh218',
    //路径
    path:'yue.vzhuke.com',
    //日志
    debugging:false,
    //一次加载数量
    loadNum:5,
    //客服电话
    customerService:15201146112
};

module.exports = Config;