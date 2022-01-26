import { NextFunction, Request, Response } from "express";
const Collection = require("../models/collections");

export const addCollection = (req: Request, res: Response) => {
  return res.status(200).json({ message: "working" });
};
