const jwt = require('jsonwebtoken');
let jwtSecret;

if (process.env.NODE__ENV === 'production') {
    jwtSecret = process.env.jwtSecret;
} else {
    jwtSecret = require('../config/keys').jwtSecret;
}

function auth(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) console.log(err);
    if (decoded) {
      next();
    } else {
      return res.status(401).json({
        msg: 'Invalid token!',
      });
    }
  });
}

module.exports = auth;
