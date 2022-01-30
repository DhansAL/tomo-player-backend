import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

export const signup = (req: Request, res: Response) => {
  User.findOne({ username: req.body.username }).exec(async (error, user) => {
    //if already registered
    if (user) {
      return res.status(400).json({
        message: "username already registered or taken",
      });
    }
    //create one if not
    const { username, password } = req.body;
    console.log(username, password);

    const hash_password = await bcrypt.hash(password, 10);

    const _user = new User({
      username,
      hash_password,
    });

    _user.save((error, data) => {
      if (error) {
        console.log(error);
        return res
          .status(400)
          .json({ message: "something went wrong while saving user" });
      }
      if (data) {
        return res.status(200).json({
          message: "user signed up successfully",
        });
      }
    });
  });
};

export const signin = (req: Request, res: Response) => {
  User.findOne({
    username: req.body.username,
  }).exec(async (error, user) => {
    if (error) {
      return res.status(400).json({ error });
    }
    //FIXME: this should throw error on wrong creds.
    if (!user) {
      return res
        .status(400)
        .json({ msg: "didnt find any user. please check your credentials" });
    }
    if (user) {
      //@ts-expect-error
      //FIXME: set typedeclaration for .authenticate
      const isPassword = await user.authenticate(req.body.password);

      if (isPassword) {
        //assign token
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET as Secret,
          {
            expiresIn: "1d",
          }
        );
        const { _id, username } = user;

        res.status(200).json({
          token,
          user: {
            _id,
            username,
          },
        });
      } else {
        res.status(400).json({
          message: "invalid  credentials",
        });
      }
    }
  });
};
