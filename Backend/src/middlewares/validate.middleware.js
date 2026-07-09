import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      return next(
        new ApiError(400, error.issues?.[0]?.message || "Validation failed"),
      );
    }
  };
};

export default validate;
