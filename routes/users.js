var express = require('express');
var router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// User is already at /users/ or else they wouldnt have gotten to this piece of middleware
router.post('/registerProcess', (req, res) => {
  const {username, email, password, password2} = req.body;

  const checkUserExistsQuery = `
    SELECT * FROM users WHERE username = $1 OR email = $2
  `;

  db.any(checkUserExistsQuery, [username, email]).then( resp => {
    if (resp.length > 0) {
      // This user already exists
      res.redirect('/login?msg=userexists');
    } else {
      // This is a new user.  Insert
      insertUser();
    }
  });

  function insertUser() {
    const insertUserQuery = `
      INSERT INTO users (username, email, password)
      VALUES
      ($1, $2, $3)
      RETURNING id
    `;
    const hash = bcrypt.hashSync(password, 10);
    db.one(insertUserQuery, [username, email, hash]).then( resp => {
      res.json({
        msg: resp
      })
    })
  }
});

router.post('/loginProcess', (req, res) => {
  // res.json(req.body);
  const checkUserQuery = `
    SELECT * FROM users WHERE username=$1
  `;
  db.one(checkUserQuery, [req.body.username]).then( resp => {
    // res.json(resp);
    const correctPass = bcrypt.compareSync(req.body.password, resp.password);
    console.log(correctPass);
    if (correctPass) {
      res.json('Logged in');
    } else {
      res.redirect('/login?msg=badPass');
    }
  }).catch( err => {
    res.json({
      msg: "userDoesNotExist"
    });
  });
});

module.exports = router;
