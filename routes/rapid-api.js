let express = require('express');
let router = express.Router();

function error(status, msg) {
  let err = new Error(msg);
  err.status = status;
  return err;
}


router.get('/coin-ranking', function(req, res, next) {
  res.send('coin-ranking');
});

module.exports = router;
