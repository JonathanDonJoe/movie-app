var express = require('express');
var router = express.Router();
const request = require('request');

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
const apiBaseUrl = 'http://api.themoviedb.org/3';

/* GET home page. */  
router.get('/', function(req, res, next) {
  const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
  // console.log(nowPlayingUrl);
  // request.get takes 2 args: 1. URL to get 2. the callback to run when req is fulfilled
  request.get(nowPlayingUrl, (error, response, movieData) => {
    console.log(movieData);
  })
  res.render('index', { title: 'Express' });
});

module.exports = router;
