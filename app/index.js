function init (app){
  app.use('/jdmailNode/emails', require('./routes/email.routes'));
  app.use('/bugIssues', require('./routes/bugIssues.routes'));
}

module.exports = init;
