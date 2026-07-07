const authorize = (...roles) => {
  return async (req, res, next) => {
    try {
      // 1. Check if user exists
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required.",
        });
      }

      // 2. Check if user's role is allowed
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to access this resource.",
        });
      }

      // 3. Everything is fine
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default authorize;
