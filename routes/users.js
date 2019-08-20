var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// User is already at /users/ or else they wouldnt have gotten to this piece of middleware
router.post('/registerProcess', (req, res) => {
  const {username, email, password, password2} = req.body;
});
module.exports = router;
