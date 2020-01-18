const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWTSECRET;

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
