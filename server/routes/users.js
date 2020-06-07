var express = require('express');
var router = express.Router();

const User = require('../models/User');

/* GET users listing. */
router.get('/', (req, res, next) => {
  return res.json({
    msg: "User Works"
  });
});

router.post('/signup', (req, res, next) => {
  const email = req.body.email;

  User.findOne({
    email
  })
  .then(user => {
    if (user) {
      return res.status(400).json({ error: 'Email already taken.'})
    } else {
      const newUser = new User({
        userName: req.body.userName,
        password: req.body.password, 
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        country: req.body.country
      });

      newUser.save()
        .then(user => {
          let userVar = user.toObject();
          userVar['login'] = true;
          res.json(userVar);
        })
        .catch(err => console.log(err));
    }
  })
});

router.post('/login', (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  User.findOne({userName})
    .then((user) => {
      if (!user) {
        return res.status(404).json({login: false, error: 'User not found.'})
      } else {
        if (user.password === password) {
          res.json({
            login: true,
            error: '',
            firstName: user.firstName,
            lastName: user.lastName
          });
        } else {
          return res.status(400).json({ 
            login: false,
            error: 'Password did not match'
          });
        }
      }
    });
});


module.exports = router;
