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
/*
const reserveValidation = [
  
  body('checkIn')
    .custom((value) => {
      if(value == '') {
        throw new Error ('Check In date is required');
      }
      return true;
    }),
  body('checkOut')
    .custom((value, { req }) => {
      if(value == '') {
        throw new Error ('Check Out date is required');
      }
      if(new Date(value) <= new Date(req.body.checkIn)) {
          throw new Error ('Check Out date must be after Check In date');
      }
      return true;
    }),
  body('pax')
  .custom((value) => {
    if(value > 8) {
      throw new Error ('Maximum capacity is 8.');
    }
    return true;
  }),

];
*/

module.exports = { signupValidation, loginValidation };