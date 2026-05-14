const roleMiddleware = (...roles) => {
  return (req, res, next) => {

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied due to insufficient role",
      });
    }

    next();
  };
};

module.exports = { roleMiddleware };