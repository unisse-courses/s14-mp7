const { body } = require('express-validator');

 // Input values should not be empty
const signupValidation = [

  body('name').not().isEmpty().withMessage("Name is required."),

  body('email').not().isEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Please provide a valid email."),


  body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),

  body('password2').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match.");
      }
      return true;
    }),

  body('gender').not().isEmpty().withMessage("Gender is required."),

  body('userType').not().isEmpty().withMessage("User type is required."),

  body('invalidCheck').not().isEmpty().withMessage("Agreeing to terms is required."),
];

const loginValidation = [

  body('username').not().isEmpty().withMessage("Username is required."), 

  body('password').not().isEmpty().withMessage("Password is required.")
];

// update exports
module.exports = { signupValidation, loginValidation };