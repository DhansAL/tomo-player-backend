import * as express from "express";
import { signin, signup } from "../controllers/auth";
import {
  isRequestValidated,
  validateSigninRequests,
  validateSignupRequests,
} from "../validators/auth";

export const authRouter = express.Router();
authRouter.post("/signup", validateSignupRequests, isRequestValidated, signup);
authRouter.post("/signin", validateSigninRequests, isRequestValidated, signin);
