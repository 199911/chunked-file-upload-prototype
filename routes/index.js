var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Upload file. */
router
  .post('/files',
    function(req, res, next) {
      req.rawBody = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk) {
        req.rawBody += chunk;
      });
      req.on('end', function() {
        next();
      });
    },
    function(req, res, next) {
      console.log(req.rawBody);
      res.send('OK');
    }
  );

module.exports = router;
