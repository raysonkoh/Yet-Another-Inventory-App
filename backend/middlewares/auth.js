const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/keys').jwtSecret;

function auth(req, res, next) {
  const token = req.body.headers.Authorization.split(' ')[1];
  console.log(token);
  jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) console.log(err);
      console.log(decoded);
    if (decoded) {
      next();
      /*
      return res.status(200).json({
        msg: 'User verified!',
        name: decoded.data.name,
        email: decoded.data.email,
        inventoryId: decoded.data.inventoryId,
        token,
      });
      */
    } else {
      return res.status(401).json({
        msg: 'Invalid token!',
      });
    }
  });
}

module.exports = auth;
