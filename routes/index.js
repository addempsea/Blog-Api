var express = require('express');
var router = express.Router();
const accounts = require('../controllers/user');


router.get('/', (req, res, err, next) => {
  if(err) next(err);
  res.status(200).json({
    "message": "Welcome to my blog"
  })
});


router.post('/register', accounts.register);
router.post('/login', accounts.login);


module.exports = router;
