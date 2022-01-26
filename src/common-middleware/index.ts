import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

export const requireSignin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET as Secret);
    //@ts-expect-error ?
    req.user = user;
  } else {
    return res.status(400).json({
      message: "authorization requiered",
    });
  }
  next();
};
