var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.dbUrl, function (err) {
    if (err) {
        console.error('[数据库链接错误]connect to %s error', err.message);
        process.exit(1);
    }
});


exports.mongoose = mongoose;