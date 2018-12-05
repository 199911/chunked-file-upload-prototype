var express = require('express');
var multer  = require('multer')
var router = express.Router();
var upload = multer({ dest: 'uploads/' }).single('myFiles');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Upload file. */
router
  .post(
    '/files',
    function (req, res) {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.log('multer error');
          console.log(err);
        } else if (err) {
          // An unknown error occurred when uploading.
          console.log('unknown error');
          console.log(err);
        } else {
          // Everything went fine.
          console.log('no error');
        }
        res.send('OK');
      });
    }
  );

module.exports = router;
