import { Request, NextFunction, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

export const requireSignin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET as Secret);
      //FIXME: this should be a custom property in req class
      // work with extending the req class (https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request)
      // pushing in body for now
      req.body.tokenId = user;
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "invalid token sent",
      });
    }
  } else {
    return res.status(400).json({
      message: "authorization requiered",
    });
  }
  next();
};
