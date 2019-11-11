
const express = require('express');
const router = express.Router();
// controller to be added 
const emailCntrlr = require('../controllers/email.controller')

// router.get('/test', emailCntrlr.testUTF);
router.get('/email-count', emailCntrlr.emailCount);
router.get('/email-content', emailCntrlr.getEmailContent);
router.post('/company-details', emailCntrlr.getCompanyDetails);
router.post('/email-body', emailCntrlr.getEmailBody);
router.post('/email-read-flag', emailCntrlr.setEmailReadFlag);
router.post('/email-reply-update', emailCntrlr.updateEmailReply);

module.exports = router;