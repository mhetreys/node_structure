
const express = require('express');
const router = express.Router();
// controller to be added 
const bugIssuesCntrlr = require('../controllers/bugIssues.controller')

// router.get('/test', emailCntrlr.testUTF);
router.get('/invalid-cat-contracts', bugIssuesCntrlr.getInvalidCategoryContracts);
router.post('/search', bugIssuesCntrlr.searchData);

module.exports = router;