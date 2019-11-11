const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://172.29.0.186:27017/";

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('validate_contracts');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};