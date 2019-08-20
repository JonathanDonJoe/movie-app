var express = require('express');
var router = express.Router();
const db = require('../db');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// User is already at /users/ or else they wouldnt have gotten to this piece of middleware
router.post('/registerProcess', (req, res) => {
  const {username, email, password, password2} = req.body;

  const insertUserQuery = `
  INSERT INTO users (username, email, password)
  VALUES
    ($1, $2, $3)
  RETURNING id
  `
  db.one(insertUserQuery, [username, email, password]).then( resp => {
    res.json({
      msg: "useradded"
    })
  })
});
module.exports = router;
