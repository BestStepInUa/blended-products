import { Router } from 'express';
import { celebrate } from 'celebrate';

import { registerUserSchema } from '../validation/authValidation';
import { registerUser } from '../controlles/authController';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  celebrate(registerUserSchema, { abortEarly: false }),
  registerUser,
);

export default authRouter;
