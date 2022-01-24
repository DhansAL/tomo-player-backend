import { check, validationResult } from "express-validator";
import { Request, Response } from "express";

export const validateSignupRequests = [
  //taking username and password only currently
  check("email").notEmpty().withMessage("email is requiered"),
  check("firstName").notEmpty().withMessage("first name is requiered"),
  check("lastName").notEmpty().withMessage("last name is requiered"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 character long"),
];

export const validateSigninRequests = [
  check("email").notEmpty().withMessage("valid email is requiered"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 character long"),
];

export const isRequestValidated = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
