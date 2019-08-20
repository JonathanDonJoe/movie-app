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

  const checkUserExistsQuery = `
  SELECT * FROM users WHERE username = $1 OR email = $2
  `

  db.any(checkUserExistsQuery, [username, email]).then( resp => {
    if (resp.length > 0) {
      // This user already exists
      res.redirect('/login?msg=userexists')
    } else {
      // This is a new user.  Insert
      insertUser()
    }
  })

  function insertUser() {
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
  }
});
  module.exports = router;
