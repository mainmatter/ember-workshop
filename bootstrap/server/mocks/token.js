module.exports = function(app) {
  var express     = require('express');
  var tokenRouter = express.Router();

  tokenRouter.post('/', function(req, res) {
    if (req.body.grant_type === 'password') {
      if (req.body.username === 'letme' && req.body.password === 'in') {
        res.status(200).send('{ "access_token": "secret token!", "account_id": 1 }');
      } else {
        res.status(400).send('{ "error": "invalid_grant" }');
      }
      res.status(400).send('{ "error": "unsupported_grant_type" }');
    }
  });

  app.use('/token', require('body-parser').urlencoded({ extended: true }));
  app.use('/token', tokenRouter);
};
