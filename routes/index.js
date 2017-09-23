const express = require('express');
const router = express.Router();
const request = require('request');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const CONFIG = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  const oauth = OAuth({
    consumer: {
      key: CONFIG.NOKIA_API_KEY,
      secret: CONFIG.NOKIA_API_SECRET
    },
    signature_method: 'HMAC-SHA1',
    hash_function: (base_string, key) => {
      return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
  });
  const data = {
    url: 'https://developer.health.nokia.com/account/request_token',
    method: 'GET'
  };
  console.log("oauth.authorize(data): "+JSON.stringify(oauth.authorize(data)));
  request({
    url: data.url,
    method: data.method,
    qs: oauth.authorize(data)
  }, (err, res, body) => {
    console.log("err: "+JSON.stringify(err));
    console.log("res: "+JSON.stringify(res));
    console.log("body: "+JSON.stringify(body));
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
