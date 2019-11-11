const dbconfig = require('../../config/database.config');
const SqlObj = require('../utility/MySql.connect');
const axios = require('axios');
const helperFunc = require('../utility/helperFunc');
const curlObj = require('../utility/curlRequest');
const validateObj = require('../models/validate_contracts.model.js')
var mongoose = require('mongoose');

module.exports.getInvalidCategoryContracts = (req, res)=>{	
            
			res.header("Access-Control-Allow-Origin", "*");
            validateObj.validateContractsModel.find({'categories_valid': false}).then(resp=>{                                               
                if(resp.length > 0) {
                    res.status(200).send({ errorCode: 0, errorMsg: "Data Found", data: resp });
                } else {
                    res.status(402).send({ errorCode: 1, errorMsg: "Data Not Found" });
                }
            }).catch(err=>{
                res.status(500).send({ errorCode: 1, errorMsg: err.msg || "Something went wrong" });
            })            
}

module.exports.searchData = (req, res)=>{	
            console.log(req.body.parentid);
            
    res.header("Access-Control-Allow-Origin", "*");
    validateObj.validateContractsModel.find({'parentid': req.body.parentid}).then(resp=>{                                               
        if(resp.length > 0) {
            res.status(200).send({ errorCode: 0, errorMsg: "Data Found", data: resp });
        } else {
            res.status(402).send({ errorCode: 1, errorMsg: "Data Not Found" });
        }
    }).catch(err=>{
        res.status(500).send({ errorCode: 1, errorMsg: err.msg || "Something went wrong" });
    })            
}

