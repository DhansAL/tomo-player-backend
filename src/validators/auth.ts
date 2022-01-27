import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validateSignupRequests = [
  //taking username and password only currently
  check("username").notEmpty().withMessage("username is requiered"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 character long"),
];

export const validateSigninRequests = [
  check("username").notEmpty().withMessage("valid email is requiered"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 character long"),
];

export const isRequestValidated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    res.status(400).json({ error: errors.array()[0].msg });
    return;
  }
  next();
};
