const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const dbUser = require('../models/user');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
require('dotenv').config()

passport.use(new Strategy(
  function(username, password, next) {
    dbUser.findOne({username: username}, (err, user) => {
      if (passwordHash.verify(password, user.password)) {
        let token = jwt.sign({
          username: user.username
        }, process.env.SECRET, {expiresIn: '1h'})
        let userInfo = {
          token: token,
          username: user.username,
          id: user.id
        }
        next(null, userInfo)
      }else {
        next('username or password is not exist')
      }
    })
  }
))

module.exports = passport.authenticate("local", {session: false})
