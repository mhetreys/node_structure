const mongoose = require('mongoose');


const ValidateContractsSchema = mongoose.Schema({
});
exports.validateContractsModel = mongoose.model('contracts_validation_status', ValidateContractsSchema, 'contracts_validation_status');