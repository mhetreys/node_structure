const envObj = require('./env.conf.js');
const dbConst = require('./database.const.js');
console.log("database.config")

if (envObj.env == 'dev') {
    module.exports = {
        local: {
            email: { host: '172.29.67.213', user: dbConst.USERNAME, password: dbConst.PASSWARD, database: dbConst.DBNAME }
        }
    }
} 
// TODO
else {
    module.exports = {
        // yet to be created
        local: {
            email: { host: '192.168.17.233', user: dbConst.USERNAME, password: dbConst.PASSWARD, database: dbConst.DBNAME },
        }
    }
}
