console.log("dbconst");
const envObj = require('./env.conf.js');


if (envObj.env == 'dev'){
    module.exports = {
        USERNAME: 'application',
        PASSWARD: 's@myD#@mnl@sy',
        DBNAME: 'd_jds',
        MONGOURL: 'mongodb://172.29.0.186:27017/validate_contracts'
    }
}else {
    module.exports = {
        USERNAME: 'jddb1',
        PASSWARD: 'w1sem@n0ut',
        DBNAME: 'online_regis',
        MONGOURL: 'mongodb://172.29.0.186:27017/validate_contracts'
    }
}