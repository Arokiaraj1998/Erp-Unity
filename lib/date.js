const moment = require('moment');

const utcTime = moment.utc();

module.exports.utc = utcTime;

module.exports.formatDate = function (date) {
    var d = new Date();
    if(date !== undefined || ''){
        d = new Date(date)
    }
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}