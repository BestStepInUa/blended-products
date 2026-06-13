import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).trim(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(8).required(),
  }),
};

// export const loginUserSchema = {
//   [Segments.BODY]: Joi.object({
//     email: Joi.string().email().trim().required().messages({
//       'string.email': 'Please provide a valid email address',
//       'any.required': 'Email is required',
//       'string.trim': 'Email cannot contain leading or trailing whitespace',
//     }),
//     password: Joi.string().min(8).required().messages({
//       'string.min': 'Password must be at least 8 characters long',
//       'any.required': 'Password is required',
//     }),
//   }),
// };
