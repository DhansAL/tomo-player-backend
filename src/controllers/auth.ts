import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";

export const signup = (req: Request, res: Response) => {
  User.findOne({ email: req.body.username }).exec(async (error, user) => {
    //if already registered
    if (user) {
      return res.status(400).json({
        message: "username already registered",
      });
    }
    //create one if not
    const { username, password } = req.body;

    const hash_password = await bcrypt.hash(password, 10);

    const _user = new User({
      username,
      hash_password,
    });
  });
};
