const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  console.log(req.headers.authorization)
  if (
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    const jwtToken = req.headers.authorization.substring(
            7,
            req.headers.authorization.length
        );
    if (!jwtToken) {
      return res.send("no jwt token");
    } else {
      const payload = jwt.verify(jwtToken, process.env.SECRET);
      req.user = payload;
      next();
    }
  } else {
    res.send("unauthosied user");
  }
};
