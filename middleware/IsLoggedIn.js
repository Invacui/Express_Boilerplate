const jwt = require('jsonwebtoken');

const env = require("dotenv");
env.config({path:"../../Private.env"})
const IsLoggedIn = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const SECRETKEY = process.env.PRIVATE_TOKEN_KEY;
    console.log(authHeader + SECRETKEY  )
      const token = authHeader && authHeader.split(' ')[1];
    
      if (!token) return res.sendStatus(401);
    
      jwt.verify(token, SECRETKEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
      });
};

module.exports = IsLoggedIn;
