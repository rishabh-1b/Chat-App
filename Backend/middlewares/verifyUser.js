const jwt = require("jsonwebtoken");

exports.verifyUser = (req,res,next) =>
{
  if(!req.cookies.token)
  {
    return res.status(401).json(
      {
        success : false,
        message :  "Unauthorized Access"
      }
    )
  }
  const user = jwt.verify(req.cookies.token,process.env.JWT_SECRET);
  req.user=user;
  next();
}