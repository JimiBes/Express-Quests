const Joi = require("joi");
const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const errors = [];

  if (title == null) {
    errors.push({ field: "title", message: "Title is required" });
  }
  if (director == null) {
    errors.push({ field: "director", message: "Director is required" });
  }
  if (year == null) {
    errors.push({ field: "year", message: "Year is required" });
  }
  if (color == null) {
    errors.push({ field: "color", message: "Color is required" });
  }
  if (duration == null) {
    errors.push({ field: "duration", message: "Duration is required" });
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateMovie,
  validateUser,
};
