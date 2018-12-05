var express = require('express');
var multer  = require('multer')
var router = express.Router();

var storage = multer.diskStorage(
  {
    destination: './uploads/',
    // Add part sequence to the file name
    filename: function ( req, file, cb ) {
      const { index } = req.body;
      const filename = index > -1 ? `${file.originalname}-${index}` : file.originalname;
      cb(null, filename);
    }
  }
);
var upload = multer({ storage }).single('myFiles');

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
